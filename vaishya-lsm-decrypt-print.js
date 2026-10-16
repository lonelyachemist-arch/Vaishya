
import { readFileSync } from 'node:fs';
import { Abracadabra } from 'abracadabra-cn';

const key = process.argv[3] ?? process.env.VAISHYA_DEMO_KEY ?? 'vaishya-PEDIDO09111989';
const inPath = process.argv[2] ?? './vaishya-payload-invoice-bricspay-pix.wenyan.txt';

const wenyan = readFileSync(new URL(inPath, import.meta.url), 'utf-8');
const abra = new Abracadabra(); // TEXT in/out by default
abra.WenyanInput(wenyan, 'DECRYPT', key, undefined, { Enable: false }, null);
console.log(abra.Output());
