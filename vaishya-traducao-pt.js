
export const TERMOS = {
  ciphertext: 'texto cifrado',
  'Private Key': 'chave privada',
  'Public Key': 'chave pública',
  sign: 'assinar',
  verify: 'verificar',
  integrity: 'integridade',
};

import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const self = fileURLToPath(import.meta.url);
const a1 = process.argv[1] ?? '';
if (a1 && (resolve(a1) === self || resolve(`${a1}.js`) === self)) {
  console.log('== Português (LATAM) — PQC ==');
  for (const [termo, trad] of Object.entries(TERMOS)) console.log(`  ${termo} → ${trad}`);
}
