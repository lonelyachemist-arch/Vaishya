// vaishya-lsm-cifrar.mjs — SÓ cifra (Camada 3 Vaishya, NL-LSM via Abracadabra).
// JSON -> texto em chinês clássico. Sem kxco, sem vault.
// Lore: advancedEnc sempre objeto ({ Enable: false }), nunca null.
// Uso: node vaishya-lsm-cifrar.mjs [entrada.json] [saida.wenyan.txt] [chave]
// Defaults: ./vaishya-payload-invoice-bricspay-pix.json -> ./vaishya-payload-invoice-bricspay-pix.wenyan.txt
// Chave default: VAISHYA_DEMO_KEY ou vaishya-PEDIDO09111989 (DUMMY por-operação).
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { Abracadabra } from 'abracadabra-cn';

const args = process.argv.slice(2).filter((a) => a !== '--print');
const printOnly = process.argv.includes('--print');
const key = args[2] ?? process.env.VAISHYA_DEMO_KEY ?? 'vaishya-PEDIDO09111989';
const inPath = args[0] ?? './vaishya-payload-invoice-bricspay-pix.json';
const outPath = args[1] ?? './vaishya-payload-invoice-bricspay-pix.wenyan.txt';

const plain = readFileSync(new URL(inPath, import.meta.url), 'utf-8');
const abra = new Abracadabra(); // TEXT in/out por padrão
abra.WenyanInput(plain, 'ENCRYPT', key, { RandomIndex: 50, PunctuationMark: true }, { Enable: false }, null);
const wenyan = abra.Output();

const sha = (s) => createHash('sha256').update(s, 'utf-8').digest('hex').slice(0, 12);
if (printOnly) {
  console.log(wenyan); // texto puro no stdout (pode redirecionar com >)
  console.error(`ok: ${plain.length} chars JSON (${sha(plain)}) -> ${wenyan.length} chars wenyan (${sha(wenyan)}) [key=${key}]`);
} else {
  writeFileSync(new URL(outPath, import.meta.url), wenyan, 'utf-8');
  console.log(`ok: ${plain.length} chars JSON (${sha(plain)}) -> ${wenyan.length} chars wenyan (${sha(wenyan)}) -> ${outPath} [key=${key}]`);
}
