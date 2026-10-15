// vaishya-lsm-cifrar-print.mjs — copy of vaishya-lsm-cifrar.js that ALWAYS prints.
// JSON -> text in classical Chinese on stdout. Never writes a file. No kxco, no vault.
// Lore: advancedEnc always an object ({ Enable: false }), never null.
// Usage: node vaishya-lsm-cifrar-print [input.json] [key]
// Defaults: ./vaishya-payload-invoice-bricspay-pix.json
// Default key: VAISHYA_DEMO_KEY or vaishya-PEDIDO09111989 (DUMMY per-operation).
import { readFileSync } from 'node:fs';
import { Abracadabra } from 'abracadabra-cn';

const key = process.argv[3] ?? process.env.VAISHYA_DEMO_KEY ?? 'vaishya-PEDIDO09111989';
const inPath = process.argv[2] ?? './vaishya-payload-invoice-bricspay-pix.json';

const plain = readFileSync(new URL(inPath, import.meta.url), 'utf-8');
const abra = new Abracadabra(); // TEXT in/out by default
abra.WenyanInput(plain, 'ENCRYPT', key, { RandomIndex: 50, PunctuationMark: true }, { Enable: false }, null);
console.log(abra.Output());
