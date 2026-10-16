
export const TIPS_PIX = {
  EndToEndIdentification: 'txid',
  InstructedAmount: 'amount',
  Currency: 'currency',
  CreditorName: 'name',
  CreditorAccount: 'key',
};

import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const self = fileURLToPath(import.meta.url);
const a1 = process.argv[1] ?? '';
if (a1 && (resolve(a1) === self || resolve(`${a1}.js`) === self)) {
  console.log('== TIPS:PIX ==');
  for (const [o, d] of Object.entries(TIPS_PIX)) console.log(`  ${o} ≡ ${d}`);
}
