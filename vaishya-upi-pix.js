// vaishya-upi-pix.js — SOMENTE equivalência UPI:PIX (NPCI linking → PIX).
// Sem dados, sem envelope. Só o mapeamento campo ≡ campo.
// runs lore/payload.md → "Mapeamento Moksha→Create Invoice: identidade do PIX, comercial do usuário"
// runs lore/envelope.md → "Guarda main tolera com/sem extensão"
// runs lore/payload.md → "Equivalência por arquivo de trilho, sem dados"
export const UPI_PIX = {
  tr: 'txid',
  am: 'amount',
  cu: 'currency',
  pn: 'name',
  pa: 'key',
};

import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const self = fileURLToPath(import.meta.url);
const a1 = process.argv[1] ?? '';
if (a1 && (resolve(a1) === self || resolve(`${a1}.js`) === self)) {
  console.log('== UPI:PIX ==');
  for (const [o, d] of Object.entries(UPI_PIX)) console.log(`  ${o} ≡ ${d}`);
}
