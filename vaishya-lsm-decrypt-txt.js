// vaishya-lsm-decifrar.mjs — decrypts ONLY (Vaishya Layer 3, NL-LSM via Abracadabra).
// Text in classical Chinese -> JSON. No kxco, no vault.
// Lore: on DECRYPT wenyanConfig is undefined, but advancedEnc stays required (object, never null).
// runs lore/esteganografia.md → "Chave demo por operação, nunca global fixa"
// runs lore/envelope.md → "Scripts ESM em pasta commonjs: .mjs ou type module"
// Usage: node vaishya-lsm-decifrar.mjs [input.wenyan.txt] [output.json] [key]
// Defaults: ./vaishya-payload-invoice-bricspay-pix.wenyan.txt -> ./vaishya-payload-invoice-bricspay-pix.restored.json
// Default key: VAISHYA_DEMO_KEY or vaishya-PEDIDO09111989 (DUMMY per-operation).
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { Abracadabra } from 'abracadabra-cn';

const args = process.argv.slice(2).filter((a) => a !== '--print');
const printOnly = process.argv.includes('--print');
const key = args[2] ?? process.env.VAISHYA_DEMO_KEY ?? 'vaishya-PEDIDO09111989';
const inPath = args[0] ?? './vaishya-payload-invoice-bricspay-pix.wenyan.txt';
const outPath = args[1] ?? './vaishya-payload-invoice-bricspay-pix.restored.json';

const wenyan = readFileSync(new URL(inPath, import.meta.url), 'utf-8');
const abra = new Abracadabra(); // TEXT in/out by default
abra.WenyanInput(wenyan, 'DECRYPT', key, undefined, { Enable: false }, null);
const restored = abra.Output();

const sha = (s) => createHash('sha256').update(s, 'utf-8').digest('hex').slice(0, 12);
if (printOnly) {
  console.log(restored); // pure JSON on stdout (can redirect with >)
  console.error(`ok: ${wenyan.length} chars wenyan (${sha(wenyan)}) -> ${restored.length} chars JSON (${sha(restored)}) [key=${key}]`);
} else {
  writeFileSync(new URL(outPath, import.meta.url), restored, 'utf-8');
  console.log(`ok: ${wenyan.length} chars wenyan (${sha(wenyan)}) -> ${restored.length} chars JSON (${sha(restored)}) -> ${outPath} [key=${key}]`);
}
