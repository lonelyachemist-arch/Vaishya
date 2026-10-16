
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
