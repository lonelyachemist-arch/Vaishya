// vaishya-vault-descifrar-steam.js — abre el sobre como STEAM (Capa 4).
// Identidad fija: ./steam.kxco (lee la clave privada generada en el archivo).
// PQC: ML-KEM-768 exclusivo. Uso: node vaishya-vault-descifrar-steam [--in E] [--out S] [--print]
// runs lore/envelope.md → "kid é etiqueta, não chave"
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mlKem } from 'kxco-post-quantum';
import { computeKid, unwrapDek, parseEnvelope, decryptPayload, readIdentity, KxcoVaultError } from 'kxco-pq-vault';

const IDENTITY = './steam.kxco';
const HERE = dirname(fileURLToPath(import.meta.url));
const R = (p) => (isAbsolute(p) ? p : resolve(HERE, p));

const args = process.argv.slice(2).filter((a) => a !== '--print');
const printOnly = process.argv.includes('--print');
const opt = (n) => {
  const i = args.indexOf(n);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : null;
};
const inPath = opt('--in') ?? './vaishya-payload-invoice-bricspay-pix.json.kxco';
const outPath = opt('--out') ?? './vaishya-payload-invoice-bricspay-pix.steam.restored.json';

const { publicKey, secretKey, algorithm } = readIdentity(R(IDENTITY));
if (algorithm !== 'ml-kem-768') throw new Error(`rechazo: ${IDENTITY} usa ${algorithm}, exigido ml-kem-768`);
const myKid = computeKid(publicKey);
const { header, canonicalHeader, ciphertext } = parseEnvelope(readFileSync(R(inPath)));
const block = header.recipients.find((r) => r.kid === myKid);
if (!block) throw new KxcoVaultError('steam no es destinataria de este sobre');
const ss = Buffer.from(mlKem.decapsulate(Buffer.from(block.encapsulatedKey, 'hex'), secretKey));
const dek = unwrapDek(ss, myKid, Buffer.from(block.wrappedDek, 'hex'));
const plain = decryptPayload(dek, Buffer.from(header.nonce, 'hex'), canonicalHeader, ciphertext);
const sha = createHash('sha256').update(plain).digest('hex').slice(0, 12);
if (printOnly) {
  process.stdout.write(plain);
  console.error(`ok: steam abrió sha=${sha}`);
} else {
  writeFileSync(R(outPath), plain);
  console.log(`ok: steam abrió sha=${sha} -> ${outPath}`);
}
