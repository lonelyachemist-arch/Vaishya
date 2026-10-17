**Idiomas:** [English](README.md) | [Português](README.pt-BR.md) | [Español](README.es-ES.md)

# Vaishya

Vaishya (Comerciante) é uma prova de conceito para criptografia pós-quântica e esteganografia linguística aplicadas à interoperabilidade financeira.

> "Trata-se da libertação do comerciante das fronteiras entre dados, algoritmos e países."

## Camadas

Vaishya cifra um payload fictício do Pix no BRICS Pay através de um fluxo multicamadas, tendo como base uma narrativa original:

> Um comprador brasileiro adquire uma DLC do Remake de Metal Gear Solid 1 para Delta Force na Steam. A Steam redireciona o pagamento para a Tencent (a publicadora do jogo). A transação é processada via Pix através do BRICS Pay, com um envelope multi-destinatário pós-quântico gerado para Steam, Tencent, BCB (Banco Central do Brasil) e PBOC (Banco Popular da China).


### 1. Payload
Um payload fictício do Pix no BRICS Pay (JSON) é usada como entrada. Ela é baseada na **BRICS Pay E-commerce API Reference**, cujos campos seguem o trilho de pagamento russo, mas adaptados ao Pix, já que o BRICS Pay está definido para integrar o Pix como um de seus sistemas de pagamento.

O payload contém:
- `paymentReference`: "PEDIDO09111989"
- `method`: "PIX"
- `currencyTicker`: "BRL"
- `returnUrl`: "https://tencent.com/return"
- `successUrl`: "https://tencent.com/success"
- `client.billing`: Dados do comprador brasileiro (countryCode, email, phone, firstName, lastName)
- `products`: "Delta Force - Metal Gear Solid 1 DLC" (sku, unitPrice, quantity)

### 2. Envelope Pós-Quântico Multi-Destinatário
O payload é envelopado em um envelope **ML-KEM-768** multi-destinatário usando `kxco-pq-vault`. Cada destinatário (Steam, Tencent, BCB e PBOC) recebe sua própria chave privada e pode decifrar o payload por conta própria, sem a necessidade de obter uma chave privada mestra. Um payload, múltiplos destinatários, chaves independentes.

### 3. Esteganografia Linguística — NL-LSM (Experimental)
Vaishya introduz o conceito de **NL-LSM** (Natural Language - Linguistic Steganography Mechanism). O **Abracadabra** serve como o **LSM** (Mecanismo de Esteganografia linguística), o equivalente linguístico do ML-KEM. Assim como **ML** (Reticulado de Módulos) é a base matemática do ML-KEM, **NL** (Linguagem Natural) é a base linguística do LSM. Enquanto o ML-KEM cifra a mensagem em um ciphertext de alta entropia, o LSM cifra a mensagem em um texto de linguagem natural.

O payload é escondido dentro de um texto chinês clássico usando o motor **Abracadabra**, como prova de conceito para esteganografia linguística aplicada à cifragem de dados financeiros. O payload é comprimido, cifrado e mapeado para caracteres chineses, produzindo um texto que parece literatura chinesa clássica.

**⚠️ Experimental:** Esta camada é marcada como experimental e não pode fazer parte de um pipeline de produção. Ela é incluída para demonstrar a viabilidade da esteganografia linguística em payloads financeiros, já que o Abracadabra opera sob a licença **AIPL-1.2**.

### 4. I18n de PQC
Os termos de criptografia pós-quântica são traduzidos para a língua do leitor usando a biblioteca `noble-post-quantum`. Cada língua é escolhida por sua relevância regional e geopolítica:

- **Português (Brasil):** o Brasil é um dos países mais engajados em interoperabilidade financeira (Pix, Open Finance), por isso lidera a PoC como mercado primário.
- **Espanhol (LATAM):** a região latino-americana mais ampla, onde a interoperabilidade financeira ainda está emergindo, frequentemente impulsionada pela adoção de stablecoins.
- **Sânscrito (BRICS):** a língua clássica da Índia, membro do BRICS e berço do sistema de pagamento UPI.
- **Italiano (Europa):** uma ponte para a União Europeia, lar do sistema de pagamento TIPS.

A mesma operação — `encrypt`, `decrypt`, `sign`, `verify`, `public key`, `private key` — é traduzida para cada língua, para que um auditor possa verificar o fluxo da critptografia na sua própria língua, sem precisar de inglês técnico.

### 5. Tradução Semântica de Campos de Trilhos de Pagamento
Os campos do payload são mapeados entre diferentes trilhos de pagamento. O campo que indica o ID da transação é `txid` no Pix, `tr` no UPI, `referencia` no CLP e `EndToEndIdentification` no TIPS. Vaishya traduz mapeando a equivalência semântica entre eles, para que um auditor em uma jurisdição possa ler uma transação de outra jurisdição no vocabulário do seu próprio trilho.

**Mapeamentos suportados:**

**UPI (Índia) ↔ Pix (Brasil):**
- `tr ≡ txid`
- `am ≡ amount`
- `cu ≡ currency`
- `pn ≡ name`
- `pa ≡ key`

**CLP (Chile) ↔ Pix (Brasil):**
- `rut ≡ cpf`
- `monto ≡ amount`
- `moneda ≡ currency`
- `referencia ≡ txid`
- `nombre ≡ name`

**TIPS (Europa) ↔ Pix (Brasil):**
- `EndToEndIdentification ≡ txid`
- `InstructedAmount ≡ amount`
- `Currency ≡ currency`
- `CreditorName ≡ name`
- `CreditorAccount ≡ key`

## Dependências

- **`kxco-pq-vault`** — Envelope pós-quântico multi-destinatário (ML-KEM-768), Apache-2.0.
- **`noble-post-quantum`** — Primitivas pós-quânticas (ML-KEM, ML-DSA), MIT. Auditada independentemente pela QuantaKrypto.
- **`abracadabra-cn`** — Esteganografia linguística (experimental), AIPL-1.2.

## Rodando a PoC

### Pré-requisitos

- **Node.js 20+** (LTS recomendado)
- **npm** (vem com o Node.js)
- **Git**

### 1. Clone o repositório

```bash
git clone https://github.com/lonelyachemist-arch/Vaishya.git
cd Vaishya
```
### 2. Instale as dependências

```bash
npm install
```

### 3. Rode o fluxo completo

O fluxo é trilíngue. Cada camada tem variantes EN, PT e ES.

### **Camada 1 — Envelope multi-destinatário (Steam, Tencent, BCB, PBOC):**

```bash

# Variante em inglês
node vaishya-vault-encrypt.js

# Variante em português
node vaishya-vault-criptografar.js

# Variante em espanhol
node vaishya-vault-cifrar.js
```
Gera as quatro identidades (`steam.kxco`, `tencent.kxco`, `bcb.kxco`, `pboc.kxco`), envelopa o payload em um envelope ML-KEM-768 multi-destinatário e roda um autoteste com cada identidade.

**Decifre como cada destinatário**

Cada destinatário tem um arquivo de identidade fixo:

```bash
# Variantes em inglês:
node vaishya-vault-decrypt-steam.js
node vaishya-vault-decrypt-tencent.js
node vaishya-vault-decrypt-bcb.js
node vaishya-vault-decrypt-pboc.js

# Variantes em português:
node vaishya-vault-descriptografar-steam.js
node vaishya-vault-descriptografar-tencent.js
node vaishya-vault-descriptografar-bcb.js
node vaishya-vault-descriptografar-pboc.js

# Variantes em espanhol:
node vaishya-vault-descifrar-steam.js
node vaishya-vault-descifrar-tencent.js
node vaishya-vault-descifrar-bcb.js
node vaishya-vault-descifrar-pboc.js
```

Cada script abre o envelope com sua **própria chave privada**. Todos os quatro veem a **mesma transação**.

### **Camada 2 — Esteganografia linguística (LSM):**

```bash
# Variantes em inglês:
node vaishya-lsm-encrypt-txt.js
node vaishya-lsm-encrypt-print.js

# Variantes em português:
node vaishya-lsm-criptografar-txt.js
node vaishya-lsm-criptografar-print.js

# Variantes em espanhol:
node vaishya-lsm-cifrar-txt.js
node vaishya-lsm-cifrar-print.js
```

Cifra o payload JSON em texto chinês clássico usando o motor `abracadabra-cn`, com saída em arquivo `.txt` ou visível no terminal.

**Decifre a esteganografia** 

```bash
# Variantes em inglês:
node vaishya-lsm-decrypt-txt.js
node vaishya-lsm-decrypt-print.js

#  Variantes em português: 
node vaishya-lsm-descriptografar-txt.js
node vaishya-lsm-descriptografar-print.js

# Variantes em espanhol:
node vaishya-lsm-descifrar-txt.js
node vaishya-lsm-descifrar-print.js
```
Restaura o texto chinês clássico de volta ao **payload JSON**.

**Rode o teste de roundtrip**

```bash
node vaishya-lsm-roundtrip.js
```
Cifra e decifra o payload em memória e compara o SHA-256. Este teste valida que a camada de esteganografia é reversível e sem perda.

- Saída esperada:

```bash
json sha=23cd3da802d8 restored sha=23cd3da802d8 match=true [key=vaishya-PEDIDO09111989]
```

### **Camada 3 — I18n de PQC (todas as quatro línguas):**

```bash
node vaishya-pqc-i18n.js
node vaishya-traducao-pt.js
node vaishya-traduccion-es.js
node vaishya-traduzione-it.js
node vaishya-anuvada-sa.js
```
Roda a tradução de ML-KEM-768 e ML-DSA-65 para cada língua: Português (Brasil), Espanhol (LATAM), Sânscrito (BRICS), Italiano (Europa). Rode o script geral ou rode cada tradução individualmente.


### **Camada 4 — Tradução semântica (UPI, CLP, TIPS ↔ Pix):**:

```bash
node vaishya-upi-pix.js
node vaishya-clp-pix.js
node vaishya-tips-pix.js
```
Cada script imprime a equivalência de campos entre o trilho de pagamento especificado e o Pix.
