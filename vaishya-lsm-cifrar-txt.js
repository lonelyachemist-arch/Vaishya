
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { Abracadabra } from 'abracadabra-cn';

const args = process.argv.slice(2).filter((a) => a !== '--print');
const printOnly = process.argv.includes('--print');
const key = args[2] ?? process.env.VAISHYA_DEMO_KEY ?? 'vaishya-PEDIDO09111989';
const inPath = args[0] ?? './vaishya-payload-invoice-bricspay-pix.json';
const outPath = args[1] ?? './vaishya-payload-invoice-bricspay-pix.wenyan.txt';

const plain = readFileSync(new URL(inPath, import.meta.url), 'utf-8');
const abra = new Abracadabra(); // TEXT in/out por defecto
abra.WenyanInput(plain, 'ENCRYPT', key, { RandomIndex: 50, PunctuationMark: true }, { Enable: false }, null);
const wenyan = abra.Output();

const sha = (s) => createHash('sha256').update(s, 'utf-8').digest('hex').slice(0, 12);
if (printOnly) {
  console.log(wenyan); // texto puro en stdout (puede redirigir con >)
  console.error(`ok: ${plain.length} caracteres JSON (${sha(plain)}) -> ${wenyan.length} caracteres wenyan (${sha(wenyan)}) [key=${key}]`);
} else {
  writeFileSync(new URL(outPath, import.meta.url), wenyan, 'utf-8');
  console.log(`ok: ${plain.length} caracteres JSON (${sha(plain)}) -> ${wenyan.length} caracteres wenyan (${sha(wenyan)}) -> ${outPath} [key=${key}]`);
}
