// vaishya-anuvada.js — केवल संस्कृतम् (BRICS). अनुवाद = tradução em sânscrito.
// Sem envelope, sem outros idiomas. Somente devanagari (romanização fica no display).
// runs lore/traducao.md → "Tradução PQC hardcoded: o código é a tradução"
// runs lore/traducao.md → "Script de idioma mostra sua tabela quando executado direto"
export const TERMOS = {
  ciphertext: 'गुप्तलेख',
  'Private Key': 'निजकुञ्चिका',
  'Public Key': 'सार्वजनिककुञ्चिका',
  sign: 'हस्ताक्षर',
  verify: 'प्रमाणय',
  integrity: 'अखण्डता',
};

import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const self = fileURLToPath(import.meta.url);
const a1 = process.argv[1] ?? '';
if (a1 && (resolve(a1) === self || resolve(`${a1}.js`) === self)) {
  console.log('== Sânscrito (BRICS) — PQC ==');
  for (const [termo, trad] of Object.entries(TERMOS)) console.log(`  ${termo} → ${trad}`);
}
