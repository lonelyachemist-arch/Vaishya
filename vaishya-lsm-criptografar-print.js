
import { readFileSync } from 'node:fs';
import { Abracadabra } from 'abracadabra-cn';

const key = process.argv[3] ?? process.env.VAISHYA_DEMO_KEY ?? 'vaishya-PEDIDO09111989';
const inPath = process.argv[2] ?? './vaishya-payload-invoice-bricspay-pix.json';

const plain = readFileSync(new URL(inPath, import.meta.url), 'utf-8');
const abra = new Abracadabra(); // TEXT in/out por padrão
abra.WenyanInput(plain, 'ENCRYPT', key, { RandomIndex: 50, PunctuationMark: true }, { Enable: false }, null);
console.log(abra.Output());
