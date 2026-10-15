// vaishya-lsm-roundtrip.mjs — tests ONLY (Vaishya Layer 3, NL-LSM via Abracadabra).
// Encrypts and decrypts in memory and compares SHA256. Writes no file. No kxco, no vault.
// Usage: node vaishya-lsm-roundtrip.mjs [input.json] [key]
// runs lore/esteganografia.md → "Chave demo por operação, nunca global fixa"
// runs lore/envelope.md → "Scripts ESM em pasta commonjs: .mjs ou type module"
// Defaults: ./vaishya-payload-invoice-bricspay-pix.json
// Default key: VAISHYA_DEMO_KEY or vaishya-PEDIDO09111989 (DUMMY per-operation).
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { Abracadabra } from 'abracadabra-cn';

const key = process.argv[3] ?? process.env.VAISHYA_DEMO_KEY ?? 'vaishya-PEDIDO09111989';
const inPath = process.argv[2] ?? './vaishya-payload-invoice-bricspay-pix.json';

const plain = readFileSync(new URL(inPath, import.meta.url), 'utf-8');

const enc = new Abracadabra();
enc.WenyanInput(plain, 'ENCRYPT', key, { RandomIndex: 50, PunctuationMark: true }, { Enable: false }, null);

const dec = new Abracadabra();
dec.WenyanInput(enc.Output(), 'DECRYPT', key, undefined, { Enable: false }, null);
const restored = dec.Output();

const sha = (s) => createHash('sha256').update(s, 'utf-8').digest('hex').slice(0, 12);
const match = restored === plain;
console.log(`json sha=${sha(plain)} restored sha=${sha(restored)} match=${match} [key=${key}]`);
if (!match) process.exit(1);
