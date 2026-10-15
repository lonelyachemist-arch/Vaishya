// vaishya-lsm-decifrar.mjs — SÓ decifra (Camada 3 Vaishya, NL-LSM via Abracadabra).
// Texto em chinês clássico -> JSON. Sem kxco, sem vault.
// Lore: no DECRYPT o wenyanConfig é undefined, mas o advancedEnc continua obrigatório (objeto, nunca null).
// Uso: node vaishya-lsm-decifrar.mjs [entrada.wenyan.txt] [saida.json] [chave]
// Defaults: ./vaishya-payload-invoice-bricspay-pix.wenyan.txt -> ./vaishya-payload-invoice-bricspay-pix.restored.json
// Chave default: VAISHYA_DEMO_KEY ou vaishya-PEDIDO09111989 (DUMMY por-operação).
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { Abracadabra } from 'abracadabra-cn';

const args = process.argv.slice(2).filter((a) => a !== '--print');
const printOnly = process.argv.includes('--print');
const key = args[2] ?? process.env.VAISHYA_DEMO_KEY ?? 'vaishya-PEDIDO09111989';
const inPath = args[0] ?? './vaishya-payload-invoice-bricspay-pix.wenyan.txt';
const outPath = args[1] ?? './vaishya-payload-invoice-bricspay-pix.restored.json';

const wenyan = readFileSync(new URL(inPath, import.meta.url), 'utf-8');
const abra = new Abracadabra(); // TEXT in/out por padrão
abra.WenyanInput(wenyan, 'DECRYPT', key, undefined, { Enable: false }, null);
const restored = abra.Output();

const sha = (s) => createHash('sha256').update(s, 'utf-8').digest('hex').slice(0, 12);
if (printOnly) {
  console.log(restored); // JSON puro no stdout (pode redirecionar com >)
  console.error(`ok: ${wenyan.length} chars wenyan (${sha(wenyan)}) -> ${restored.length} chars JSON (${sha(restored)}) [key=${key}]`);
} else {
  writeFileSync(new URL(outPath, import.meta.url), restored, 'utf-8');
  console.log(`ok: ${wenyan.length} chars wenyan (${sha(wenyan)}) -> ${restored.length} chars JSON (${sha(restored)}) -> ${outPath} [key=${key}]`);
}
