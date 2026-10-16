
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
