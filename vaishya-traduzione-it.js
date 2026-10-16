// vaishya-traduzione.js — SOLO italiano (Europa). Senza involucro, senza altre lingue.
// runs lore/traducao.md → "Tradução PQC hardcoded: o código é a tradução"
// runs lore/traducao.md → "Script de idioma mostra sua tabela quando executado direto"
export const TERMOS = {
  ciphertext: 'testo cifrato',
  'Private Key': 'chiave privata',
  'Public Key': 'chiave pubblica',
  sign: 'firmare',
  verify: 'verificare',
  integrity: 'integrità',
};

import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const self = fileURLToPath(import.meta.url);
const a1 = process.argv[1] ?? '';
if (a1 && (resolve(a1) === self || resolve(`${a1}.js`) === self)) {
  console.log('== Italiano (Europa) — PQC ==');
  for (const [termo, trad] of Object.entries(TERMOS)) console.log(`  ${termo} → ${trad}`);
}
