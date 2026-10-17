**Languages:** [English](README.md) | [Português](README.pt-BR.md) | [Español](README.es-ES.md)
# Vaishya
Vaishya (Merchant) is a proof-of-concept for post-quantum cryptography and linguistic steganography applied to financial interoperability. 

> "It is the liberation of the merchant from the borders between data, algorithms, and countries"

## Layers
Vaishya encrypts a dummy BRICS Pay Pix payload invoice through a multi-layer pipeline, using an original narrative:

> A Brazilian buyer purchases a Metal Gear Solid 1 Remake DLC for Delta Force on Steam. Steam redirects the payment to Tencent (the game's publisher). The transaction is processed via Pix through BRICS Pay, with a multi-recipient post-quantum envelope generated for Steam, Tencent, BCB (Brazilian Central Bank), and PBOC (People's Bank of China). 

### 1. Payload

A dummy **BRICS Pay Pix invoice (JSON)** is used as the input. It is based on the **BRICS Pay E-commerce API Reference**, whose fields are filled with data from the russian payment rail, but adpated to Pix, as BRICS Pay is set to integrate Pix as one of its payments systems.

The payload contains:

- `paymentReference`: "PEDIDO09111989"
- `method`: "PIX"
- `currencyTicker`: "BRL"
- `returnUrl`: "https://tencent.com/return"
- `successUrl`: "https://tencent.com/success"
- `client.billing`: Brazilian buyer data (countryCode, email, phone, firstName, lastName)
- `products`: "Delta Force - Metal Gear Solid 1 DLC" (sku, unitPrice, quantity)

### 2. Post-Quantum Multi-Recipient Envelope Encryption

The payload is wrapped in a multi-recipient **ML-KEM-768** envelope using `kxco-pq-vault`. Each recipient (Steam, Tencent, BCB, and PBOC) gets their own private key and can decrypt the payload by themselves, without the need to obtain a master private key. One payload, multiple recipients, independent keys.

### 3. Linguistic Steganography — NL-LSM (Experimental)

Vaishya introduces the NL-LSM (Natural Language - Linguistic Steganography Mechanism) concept. **Abracadabra** serves as the **LSM** (Linguistic Steganography Mechanism), the linguistic equivalent of ML-KEM. Just as **ML** (Module-Lattice) is the mathematical foundation of ML-KEM, **NL** (Natural Language) is the linguistic foundation of LSM. While ML-KEM ciphers the message in a high entropy ciphertext, LSM ciphers the message in a natural language text.

The payload is hidden inside a classical Chinese text using the **Abracadabra** engine, as a proof-of-concept for linguistic steganography applied to financial data encryption. The payload is compressed, encrypted, and mapped to Chinese characters, producing a text that appears to be classical Chinese literature.

**⚠️ Experimental:** This layer is marked as experimental and cannot be part of a production pipeline. It is included to demonstrate the feasibility of linguistic steganography in financial payloads, as Abracadabra operates under **AIPL-1.2** license. 

### 4. PQC I18n (Internationalization)

The post-quantum cryptographic terms are translated into the reader's language using the `noble-post-quantum` library. Each language is chosen for its regional and geopolitical relevance:

- **Portuguese (Brazil):** Brazil is one of the most engaged countries in financial interoperability (Pix, Open Finance), which is why it leads the PoC as the primary market.
- **Spanish (LATAM):** The broader Latin American region, where financial interoperability is still emerging, often driven by stablecoins adoption.
- **Sanskrit (BRICS):** The classical language of India, a BRICS member and the birthplace of the UPI payment system.
- **Italian (Europe):** A bridge to the European Union, home of the TIPS payment system.

The same operation — `encrypt`, `decrypt`, `sign`, `verify`, `public key`, `private key` — is translated to each language, so that an auditor can read the cryptographic report in their own language, without needing technical English.

### 5. Semantic Translation of Payment Rail Fields

The payload fields are mapped across different payment rails. A field that means "transaction ID" is `txid` in Pix, `tr` in UPI, `referencia` in CLP, and `EndToEndIdentification` in TIPS. Vaishya translates by mapping the semantic equivalence between them, so that an auditor in one jurisdiction can read a transaction from another jurisdiction in their own rail's vocabulary.

**Supported mappings:**

**UPI (India) ↔ Pix (Brazil):**

- `tr ≡ txid`
- `am ≡ amount`
- `cu ≡ currency`
- `pn ≡ name`
- `pa ≡ key`

**CLP (Chile) ↔ Pix (Brazil):**

- `rut ≡ cpf`
- `monto ≡ amount`
- `moneda ≡ currency`
- `referencia ≡ txid`
- `nombre ≡ name`

**TIPS (Europe) ↔ Pix (Brazil):**

- `EndToEndIdentification ≡ txid`
- `InstructedAmount ≡ amount`
- `Currency ≡ currency`
- `CreditorName ≡ name`
- `CreditorAccount ≡ key`

## Dependencies

- **`kxco-pq-vault`** — Multi-recipient post-quantum envelope (ML-KEM-768), Apache-2.0.
- **`noble-post-quantum`** — Post-quantum primitives (ML-KEM, ML-DSA), MIT. Audited independently by QuantaKrypto.
- **`abracadabra-cn`** — Linguistic steganography (experimental), AIPL-1.2.

## Running the PoC

### Prerequisites

- **Node.js 20+** (LTS recommended)
- **npm** (comes with Node.js)
- **Git**

### 1. Clone the repository

```bash
git clone https://github.com/lonelyachemist-arch/Vaishya.git
cd Vaishya
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the full pipeline

The pipeline is multilingual. Each layer has EN, PT, and ES variants.

### **Layer 1 — Multi-recipient envelope (Steam, Tencent, BCB, PBOC)**:

```bash

# English variant

node vaishya-vault-encrypt.js

# Portuguese variant

node vaishya-vault-criptografar.js

# Spanish variant

node vaishya-vault-cifrar.js
```
Generates the four identities (`steam.kxco`, `tencent.kxco`, `bcb.kxco`, `pboc.kxco`), wraps the payload in a multi-recipient ML-KEM-768 envelope, and runs a selftest with each identity.

**Decrypt as each recipient** 

Each recipient has a fixed identity file:

```bash
# English variants: 
node vaishya-vault-decrypt-steam.js
node vaishya-vault-decrypt-tencent.js
node vaishya-vault-decrypt-bcb.js
node vaishya-vault-decrypt-pboc.js

# Portuguese variants:
node vaishya-vault-descriptografar-steam.js
node vaishya-vault-descriptografar-tencent.js
node vaishya-vault-descriptografar-bcb.js
node vaishya-vault-descriptografar-pboc.js

# Spanish variants:
node vaishya-vault-descifrar-steam.js
node vaishya-vault-descifrar-tencent.js
node vaishya-vault-descifrar-bcb.js
node vaishya-vault-descifrar-pboc.js
```

Each script opens the envelope with its own private key. All four see the same transaction.

### **Layer 2 — Linguistic steganography (LSM)**:

```bash
# English variants:
node vaishya-lsm-encrypt-txt.js
node vaishya-lsm-encrypt-print.js

# Portuguese variants:
node vaishya-lsm-criptografar-txt.js
node vaishya-lsm-criptografar-print.js

# Spanish variants:
node vaishya-lsm-cifrar-txt.js
node vaishya-lsm-cifrar-print.js
```

Encrypts the JSON payload into classical Chinese text using the `abracadabra-cn` engine with output either as a `.txt` file or visible in the terminal. 

**Decrypt the steganography** 

```bash
# English variants:
node vaishya-lsm-decrypt-txt.js
node vaishya-lsm-decrypt-print.js

# Portuguese variants:
node vaishya-lsm-descriptografar-txt.js
node vaishya-lsm-descriptografar-print.js

# Spanish variants:
node vaishya-lsm-descifrar-txt.js
node vaishya-lsm-descifrar-print.js
```
Restores the classical Chinese text back to the JSON payload.

**Run the roundtrip test**

```bash
node vaishya-lsm-roundtrip.js
```
Encrypts and decrypts the payload in memory and compares the SHA-256. This test validates that the steganography layer is reversible and lossless. 

- Expected output:

```bash
json sha=23cd3da802d8 restored sha=23cd3da802d8 match=true [key=vaishya-PEDIDO09111989]
```

### **Layer 3 — PQC I18n (all four languages)**:

```bash
node vaishya-pqc-i18n.js

# Individual translations 
node vaishya-traducao-pt.js
node vaishya-traduccion-es.js
node vaishya-traduzione-it.js
node vaishya-anuvada-sa.js
```
Runs the ML-KEM-768 and ML-DSA-65 translation to each language: Portuguese (Brazil), Spanish (LATAM), Sanskrit (BRICS), Italian (Europe). Run the general script or run each translation individually. 


### **Layer 4 — Semantic translation (UPI, CLP, TIPS ↔ Pix)**:

```bash
node vaishya-upi-pix.js
node vaishya-clp-pix.js
node vaishya-tips-pix.js
```
Each script prints the **field equivalence** between the specified payment rail and Pix.



  
