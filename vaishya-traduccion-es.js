// vaishya-traduccion-es.js — SOLO español (LATAM). Sin envoltura, sin otros idiomas.
// runs lore/traducao.md → "Tradução PQC hardcoded: o código é a tradução"
// runs lore/traducao.md → "Script de idioma mostra sua tabela quando executado direto"
export const TERMOS = {
  ciphertext: 'texto cifrado',
  'Private Key': 'clave privada',
  'Public Key': 'clave pública',
  sign: 'firmar',
  verify: 'verificar',
  integrity: 'integridad',
};

import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const self = fileURLToPath(import.meta.url);
const a1 = process.argv[1] ?? '';
if (a1 && (resolve(a1) === self || resolve(`${a1}.js`) === self)) {
  console.log('== Español (LATAM) — PQC ==');
  for (const [termo, trad] of Object.entries(TERMOS)) console.log(`  ${termo} → ${trad}`);
}
