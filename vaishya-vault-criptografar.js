// vaishya-vault-cifrar.js — envelope multi-chave ML-KEM-768 fim a fim (Camada 4).
// GERAÇÃO ÚNICA E SOBRESCRITA: a cada execução (sem --keep) TODOS os .kxco são
// regenerados e o script imprime no terminal exatamente o que gravou no arquivo
// (recipient + kid), com leitura de volta para provar terminal == arquivo.
// `--keep` reutiliza os .kxco existentes sem tocar neles.
// Fluxo: (re)gera identidades -> cifra -> imprime CIPHERTEXT (hex) -> grava .kxco
// -> selftest: decifra com CADA identidade e confere o SHA.
// PQC: ML-KEM-768 exclusivo (recusa qualquer outro algoritmo). AES-256-GCM no payload.
// Uso: node vaishya-vault-cifrar [<id.kxco> ...] [--in entrada] [--out saida] [--keep]
// Defaults: steam tencent bcb pboc; in=payload puro; out=<in>.kxco
import { createHash, randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mlKem } from 'kxco-post-quantum';
import {
  generateDek, generateNonce, computeKid, encodePublicKey,
  wrapDek, serializeHeader, encryptPayload, readIdentity,
  unwrapDek, decryptPayload, parseEnvelope,
} from 'kxco-pq-vault';

const KEM = 'ml-kem-768';
const KEYGEN_INFO = 'kxco-vault/keygen/v1'; // mesma derivação do `keygen` do terminal
const DEFAULT_RECIPIENTS = ['steam.kxco', 'tencent.kxco', 'bcb.kxco', 'pboc.kxco'];
const HERE = dirname(fileURLToPath(import.meta.url));
const R = (p) => (isAbsolute(p) ? p : resolve(HERE, p)); // relativo ao script ou absoluto

const args = process.argv.slice(2).filter((a) => a !== '--print'); // --print legado: agora sempre imprime
const keep = args.includes('--keep'); // reutiliza .kxco; default: regenera e sobrescreve todos
const opts = args.filter((a) => a !== '--keep');
const opt = (name) => {
  const i = opts.indexOf(name);
  return i >= 0 && i + 1 < opts.length ? opts[i + 1] : null;
};
const inPath = opt('--in') ?? './vaishya-payload-invoice-bricspay-pix.json';
const outPath = opt('--out') ?? `${inPath}.kxco`;
const identityPaths = opts.filter((a) => !a.startsWith('--') && a !== opt('--in') && a !== opt('--out'));
if (identityPaths.length === 0) identityPaths.push(...DEFAULT_RECIPIENTS);

const sha12 = (b) => createHash('sha256').update(b).digest('hex').slice(0, 12);

// 1. Geração única com sobrescrita: todos os .kxco são renovados e o terminal
//    mostra exatamente o que foi gravado (recipient + kid), com leitura de volta.
for (const p of identityPaths) {
  const file = R(p);
  if (keep && existsSync(file)) {
    const { algorithm } = readIdentity(file);
    if (algorithm !== KEM) throw new Error(`recusa: ${p} usa ${algorithm}, exigido ${KEM}`);
    console.log(`identidade reutilizada (--keep): ${p} (${KEM})`);
    console.log();
    continue;
  }
  const { publicKey, secretKey } = mlKem.keypairFromMaster(randomBytes(32), KEYGEN_INFO);
  const recipient = encodePublicKey(Buffer.from(publicKey));
  writeFileSync(file, [
    'KXCO-VAULT-IDENTITY/1.0',
    `algorithm: ${KEM}`,
    `created: ${new Date().toISOString().replace(/\.\d+Z$/, 'Z')}`,
    `public: ${recipient}`,
    `secret: ${Buffer.from(secretKey).toString('hex')}`,
    '',
  ].join('\n'), 'utf-8');
  // Prova terminal == arquivo: lê de volta e compara.
  const back = readFileSync(file, 'utf-8').match(/^public:\s*(kxco1\S+)/m)?.[1];
  const same = back === recipient;
  console.log(`identidade renovada: ${p} (${KEM})`);
  console.log(`  recipient: ${recipient}`);
  console.log(`  confere arquivo: ${same ? 'OK mesma chave' : 'DIVERGE'}`);
  console.log();
  if (!same) process.exit(1);
}

// 2. Cifra multi-chave.
const plaintext = readFileSync(R(inPath));
const dek = generateDek();
const nonce = generateNonce();
const created = new Date().toISOString().replace(/\.\d+Z$/, 'Z');

const recipients = identityPaths.map((p) => {
  const { publicKey, algorithm } = readIdentity(R(p));
  if (algorithm !== KEM) throw new Error(`recusa: ${p} usa ${algorithm}, exigido ${KEM}`);
  const { ciphertext, sharedSecret } = mlKem.encapsulate(publicKey);
  const kid = computeKid(publicKey);
  const wrapped = wrapDek(Buffer.from(sharedSecret), kid, dek);
  return { kid, path: p, encapsulatedKey: Buffer.from(ciphertext).toString('hex'), wrappedDek: wrapped.toString('hex') };
});

const headerText = serializeHeader({ recipients, nonce: nonce.toString('hex'), created });
const header = Buffer.from(headerText, 'utf-8');
const ciphertext = encryptPayload(dek, nonce, header, plaintext);
const out = Buffer.concat([header, Buffer.from('--- BEGIN CIPHERTEXT ---\n', 'utf-8'), ciphertext]);
writeFileSync(R(outPath), out);

// 3. Ciphertext no terminal + resumo.
console.log(ciphertext.toString('hex'));
console.log(`ok: ${recipients.length} destinatário(s) ${KEM} sha=${sha12(plaintext)} -> ${outPath} [ciphertext acima]`);
console.log(`kids: ${recipients.map((r) => r.kid).join(', ')}`);
console.log();

// 4. Selftest: cada destinatário abre seu bloco e confere o SHA.
const { header: h, canonicalHeader, ciphertext: ct } = parseEnvelope(out);
let allOk = true;
for (const r of recipients) {
  const { secretKey } = readIdentity(R(r.path));
  const block = h.recipients.find((b) => b.kid === r.kid);
  const ss = Buffer.from(mlKem.decapsulate(Buffer.from(block.encapsulatedKey, 'hex'), secretKey));
  const d = unwrapDek(ss, r.kid, Buffer.from(block.wrappedDek, 'hex'));
  const plain = decryptPayload(d, Buffer.from(h.nonce, 'hex'), canonicalHeader, ct);
  const ok = sha12(plain) === sha12(plaintext);
  allOk &&= ok;
  console.log(`selftest ${r.path}: match=${ok}`);
}
if (!allOk) process.exit(1);
