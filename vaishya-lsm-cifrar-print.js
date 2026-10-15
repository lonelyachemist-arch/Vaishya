// vaishya-lsm-cifrar-print.mjs — copia de vaishya-lsm-cifrar.js que SIEMPRE imprime.
// JSON -> texto en chino clásico en stdout. Nunca escribe archivo. Sin kxco, sin vault.
// Lore: advancedEnc siempre objeto ({ Enable: false }), nunca null.
// Uso: node vaishya-lsm-cifrar-print [entrada.json] [clave]
// Defaults: ./vaishya-payload-invoice-bricspay-pix.json
// Clave por defecto: VAISHYA_DEMO_KEY o vaishya-PEDIDO09111989 (DUMMY por operación).
import { readFileSync } from 'node:fs';
import { Abracadabra } from 'abracadabra-cn';

const key = process.argv[3] ?? process.env.VAISHYA_DEMO_KEY ?? 'vaishya-PEDIDO09111989';
const inPath = process.argv[2] ?? './vaishya-payload-invoice-bricspay-pix.json';

const plain = readFileSync(new URL(inPath, import.meta.url), 'utf-8');
const abra = new Abracadabra(); // TEXT in/out por defecto
abra.WenyanInput(plain, 'ENCRYPT', key, { RandomIndex: 50, PunctuationMark: true }, { Enable: false }, null);
console.log(abra.Output());
