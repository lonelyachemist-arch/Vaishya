// vaishya-lsm-descifrar-print.mjs — copia de vaishya-lsm-descifrar.js que SIEMPRE imprime.
// Texto en chino clásico -> JSON en stdout. Nunca escribe archivo. Sin kxco, sin vault.
// Lore: en DECRYPT wenyanConfig es undefined, pero advancedEnc sigue obligatorio (objeto, nunca null).
// Uso: node vaishya-lsm-descifrar-print [entrada.wenyan.txt] [clave]
// Defaults: ./vaishya-payload-invoice-bricspay-pix.wenyan.txt
// Clave por defecto: VAISHYA_DEMO_KEY o vaishya-PEDIDO09111989 (DUMMY por operación).
import { readFileSync } from 'node:fs';
import { Abracadabra } from 'abracadabra-cn';

const key = process.argv[3] ?? process.env.VAISHYA_DEMO_KEY ?? 'vaishya-PEDIDO09111989';
const inPath = process.argv[2] ?? './vaishya-payload-invoice-bricspay-pix.wenyan.txt';

const wenyan = readFileSync(new URL(inPath, import.meta.url), 'utf-8');
const abra = new Abracadabra(); // TEXT in/out por defecto
abra.WenyanInput(wenyan, 'DECRYPT', key, undefined, { Enable: false }, null);
console.log(abra.Output());
