
import { readFileSync } from 'node:fs';
import { ml_kem768 } from '@noble/post-quantum/ml-kem.js';
import { ml_dsa65 } from '@noble/post-quantum/ml-dsa.js';
import { TERMOS as PT } from './vaishya-traducao-pt.js';
import { TERMOS as ES } from './vaishya-traduccion-es.js';
import { TERMOS as SA } from './vaishya-anuvada-sa.js';
import { TERMOS as IT } from './vaishya-traduzione-it.js';

const LANGS = {
  pt: 'Portuguese (LATAM)',
  es: 'Spanish (LATAM)',
  sa: 'Sanskrit (BRICS)',
  it: 'Italian (Europe)',
};
const TABELA = { pt: PT, es: ES, sa: SA, it: IT };
const traduzir = (termo, idioma = 'pt') => {
  if (!Object.hasOwn(TABELA, idioma)) throw new Error(`unknown language: ${idioma}`);
  if (!Object.hasOwn(TABELA[idioma], termo)) throw new Error(`unknown PQC term: ${termo}`);
  return TABELA[idioma][termo];
};

const payload = readFileSync(new URL('./vaishya-payload-invoice-bricspay-pix.json', import.meta.url));
let fail = 0;

for (const [i, id] of Object.keys(LANGS).entries()) {
  if (i > 0) console.log();
  console.log(`== ${LANGS[id]} ==`);
  const { publicKey: kPub, secretKey: kSec } = ml_kem768.keygen();
  const { cipherText, sharedSecret } = ml_kem768.encapsulate(kPub);
  const kemOk = Buffer.from(ml_kem768.decapsulate(cipherText, kSec)).equals(Buffer.from(sharedSecret));
  console.log(`  ${traduzir('Public Key', id)} ${kPub.length}B | ${traduzir('ciphertext', id)} ${cipherText.length}B → ${kemOk ? 'match' : 'DIVERGE'}`);
  const { publicKey: dPub, secretKey: dSec } = ml_dsa65.keygen();
  const sig = ml_dsa65.sign(payload, dSec);
  const dsaOk = ml_dsa65.verify(sig, payload, dPub);
  console.log(`  ${traduzir('sign', id)} ${sig.length}B → ${traduzir('verify', id)} ${dsaOk ? 'OK' : 'FAIL'} | ${traduzir('integrity', id)}`);
  if (!kemOk || !dsaOk) fail++;
}
process.exit(fail ? 1 : 0);
