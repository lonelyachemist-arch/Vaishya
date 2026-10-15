// vaishya-clp-pix.js — SOMENTE equivalência CLP:PIX (Fintoc → PIX).
// Sem dados, sem envelope. Só o mapeamento campo ≡ campo.
// runs lore/payload.md → "Mapeamento Moksha→Create Invoice: identidade do PIX, comercial do usuário"
// runs lore/envelope.md → "Guarda main tolera com/sem extensão"
// runs lore/payload.md → "Equivalência por arquivo de trilho, sem dados"
export const CLP_PIX = {
  rut: 'cpf',
  monto: 'amount',
  moneda: 'currency',
  referencia: 'txid',
  nombre: 'name',
};

import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const self = fileURLToPath(import.meta.url);
const a1 = process.argv[1] ?? '';
if (a1 && (resolve(a1) === self || resolve(`${a1}.js`) === self)) {
  console.log('== CLP:PIX ==');
  for (const [o, d] of Object.entries(CLP_PIX)) console.log(`  ${o} ≡ ${d}`);
}
