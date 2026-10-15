// vaishya-lsm-decifrar-print.mjs — cópia de vaishya-lsm-decifrar.js que SEMPRE imprime.
// Texto em chinês clássico -> JSON no stdout. Nunca grava arquivo. Sem kxco, sem vault.
// Lore: no DECRYPT o wenyanConfig é undefined, mas o advancedEnc continua obrigatório (objeto, nunca null).
// Uso: node vaishya-lsm-decifrar-print [entrada.wenyan.txt] [chave]
// Defaults: ./vaishya-payload-invoice-bricspay-pix.wenyan.txt
// Chave default: VAISHYA_DEMO_KEY ou vaishya-PEDIDO09111989 (DUMMY por-operação).
import { readFileSync } from 'node:fs';
import { Abracadabra } from 'abracadabra-cn';

const key = process.argv[3] ?? process.env.VAISHYA_DEMO_KEY ?? 'vaishya-PEDIDO09111989';
const inPath = process.argv[2] ?? './vaishya-payload-invoice-bricspay-pix.wenyan.txt';

const wenyan = readFileSync(new URL(inPath, import.meta.url), 'utf-8');
const abra = new Abracadabra(); // TEXT in/out por padrão
abra.WenyanInput(wenyan, 'DECRYPT', key, undefined, { Enable: false }, null);
console.log(abra.Output());
