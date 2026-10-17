**Idiomas:** [English](README.md) | [Português](README.pt-BR.md) | [Español](README.es-ES.md)

# Vaishya

Vaishya (Comerciante) es una prueba de concepto para criptografía post-cuántica y esteganografía lingüística aplicadas a la interoperabilidad financiera.

> "Es la liberación del comerciante de las fronteras entre datos, algoritmos y países."

## Capas

Vaishya cifra un payload ficticio de Pix en BRICS Pay a través de un flujo multicapa, utilizando una narrativa original:

> Un comprador brasileño adquiere un DLC del Remake de Metal Gear Solid 1 para Delta Force en Steam. Steam redirige el pago a Tencent (la publicadora del juego). La transacción se procesa vía Pix a través de BRICS Pay, con un sobre multi-destinatario post-cuántico generado para Steam, Tencent, BCB (Banco Central de Brasil) y PBOC (Banco Popular de China).

### 1. Payload
Un payload ficticio de Pix en BRICS Pay (JSON) se usa como entrada. Está basado en la **BRICS Pay E-commerce API Reference**, cuyos campos siguen el riel de pago ruso, pero adaptados a Pix, ya que BRICS Pay está definido para integrar Pix como uno de sus sistemas de pago.

El payload contiene:
- `paymentReference`: "PEDIDO09111989"
- `method`: "PIX"
- `currencyTicker`: "BRL"
- `returnUrl`: "https://tencent.com/return"
- `successUrl`: "https://tencent.com/success"
- `client.billing`: datos del comprador brasileño (countryCode, email, phone, firstName, lastName)
- `products`: "Delta Force - Metal Gear Solid 1 DLC" (sku, unitPrice, quantity)

### 2. Sobre Post-Cuántico Multi-Destinatario
El payload se envuelve en un sobre **ML-KEM-768** multi-destinatario utilizando `kxco-pq-vault`. Cada destinatario (Steam, Tencent, BCB y PBOC) recibe su propia clave privada y puede descifrar el payload por sí mismo, sin necesidad de obtener una clave privada maestra. Un payload, múltiples destinatarios, claves independientes.

### 3. Esteganografía Lingüística — NL-LSM (Experimental)
Vaishya introduce el concepto de **NL-LSM** (Natural Language Linguistic Steganography Mechanism). **Abracadabra** sirve como el **LSM** (Linguistic Steganography Mechanism), el equivalente lingüístico del ML-KEM. Así como **ML** (Module-Lattice) es la base matemática del ML-KEM, **NL** (Natural Language) es la base lingüística del LSM. Mientras ML-KEM cifra el mensaje en un texto cifrado de alta entropía, el LSM cifra el mensaje en un texto de lenguaje natural.

El payload se oculta dentro de un texto chino clásico usando el motor **Abracadabra**, como prueba de concepto para esteganografía lingüística aplicada al cifrado de datos financieros. El payload se comprime, se cifra y se mapea a caracteres chinos, produciendo un texto que parece literatura china clásica.

**⚠️ Experimental:** Esta capa está marcada como experimental y no puede formar parte de un flujo de producción. Se incluye para demostrar la viabilidad de la esteganografía lingüística en payloads financieros, ya que Abracadabra opera bajo la licencia **AIPL-1.2**.

### 4. I18n de PQC
Los términos de criptografía post-cuántica se traducen al idioma del lector usando la biblioteca `noble-post-quantum`. Cada idioma se elige por su relevancia regional y geopolítica:

- **Portugués (Brasil):** Brasil es uno de los países más comprometidos con la interoperabilidad financiera (Pix, Open Finance), por eso lidera la PoC como mercado primario.
- **Español (LATAM):** la región latinoamericana más amplia, donde la interoperabilidad financiera aún está emergiendo, a menudo impulsada por la adopción de stablecoins.
- **Sánscrito (BRICS):** el idioma clásico de India, miembro del BRICS y cuna del sistema de pago UPI.
- **Italiano (Europa):** un puente hacia la Unión Europea, hogar del sistema de pago TIPS.

La misma operación — `encrypt`, `decrypt`, `sign`, `verify`, `public key`, `private key` — se traduce a cada idioma, para que un auditor pueda verificar el flujo de la criptografía en su propio idioma, sin necesidad de inglés técnico.

### 5. Traducción Semántica de Campos de Rieles de Pago
Los campos del payload se mapean entre diferentes rieles de pago. El campo que indica el ID de la transacción es `txid` en Pix, `tr` en UPI, `referencia` en CLP y `EndToEndIdentification` en TIPS. Vaishya traduce mapeando la equivalencia semántica entre ellos, para que un auditor en una jurisdicción pueda leer una transacción de otra jurisdicción en el vocabulario de su propio riel.

**Mapeos soportados:**

**UPI (India) ↔ Pix (Brasil):**
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

## Dependencias

- **`kxco-pq-vault`** — Sobre post-cuántico multi-destinatario (ML-KEM-768), Apache-2.0.
- **`noble-post-quantum`** — Primitivas post-cuánticas (ML-KEM, ML-DSA), MIT. Auditada independientemente por QuantaKrypto.
- **`abracadabra-cn`** — Esteganografía lingüística (experimental), AIPL-1.2.

## Ejecutando la PoC

### Prerrequisitos

- **Node.js 20+** (LTS recomendado)
- **npm** (viene con Node.js)
- **Git**

### 1. Clona el repositorio

```bash
git clone https://github.com/lonelyachemist-arch/Vaishya.git
cd Vaishya
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Ejecuta el flujo completo

El flujo es multilingüe. Cada capa tiene variantes EN, PT y ES.

### **Capa 1 — Sobre multi-destinatario (Steam, Tencent, BCB, PBOC):**

```bash
# Variante en inglés
node vaishya-vault-encrypt.js

# Variante en portugués
node vaishya-vault-criptografar.js

# Variante en español
node vaishya-vault-cifrar.js
```
Genera las cuatro identidades (`steam.kxco`, `tencent.kxco`, `bcb.kxco`, `pboc.kxco`), envuelve el payload en un sobre ML-KEM-768 multi-destinatario y ejecuta una autoprueba con cada identidad.

**Descifra como cada destinatario**

Cada destinatario tiene un archivo de identidad fijo::

```bash
# Variante en inglés:
node vaishya-vault-decrypt-steam.js
node vaishya-vault-decrypt-tencent.js
node vaishya-vault-decrypt-bcb.js
node vaishya-vault-decrypt-pboc.js

# Variante en portugués:
node vaishya-vault-descriptografar-steam.js
node vaishya-vault-descriptografar-tencent.js
node vaishya-vault-descriptografar-bcb.js
node vaishya-vault-descriptografar-pboc.js

# Variante en español:
node vaishya-vault-descifrar-steam.js
node vaishya-vault-descifrar-tencent.js
node vaishya-vault-descifrar-bcb.js
node vaishya-vault-descifrar-pboc.js
```

Cada script abre el sobre con su **propia clave privada**. Los cuatro ven la **misma transacción**.

### **Capa 2 — Esteganografía lingüística (LSM):**

```bash
# Variante en inglés:
node vaishya-lsm-encrypt-txt.js
node vaishya-lsm-encrypt-print.js

# Variante en portugués:
node vaishya-lsm-criptografar-txt.js
node vaishya-lsm-criptografar-print.js

# Variante en español:
node vaishya-lsm-cifrar-txt.js
node vaishya-lsm-cifrar-print.js
```

Cifra el payload JSON en texto chino clásico usando el motor `abracadabra-cn`, con salida en archivo `.txt`o visible en la terminal.

**Descifra la esteganografía** 

```bash
#  Variante en inglés:
node vaishya-lsm-decrypt-txt.js
node vaishya-lsm-decrypt-print.js

# Variante en portugués: 
node vaishya-lsm-descriptografar-txt.js
node vaishya-lsm-descriptografar-print.js

# Variante en español:
node vaishya-lsm-descifrar-txt.js
node vaishya-lsm-descifrar-print.js
```
Restaura el texto chino clásico de vuelta al **payload JSON**.

**Ejecuta la prueba de roundtrip**

```bash
node vaishya-lsm-roundtrip.js
```
Cifra y descifra el payload en memoria y compara el SHA-256. Esta prueba valida que la capa de esteganografía es reversible y sin pérdida.

- Salida esperada:
```bash
json sha=23cd3da802d8 restored sha=23cd3da802d8 match=true [key=vaishya-PEDIDO09111989]
```

### **Capa 3 — I18n de PQC (los cuatro idiomas):**

```bash
node vaishya-pqc-i18n.js

# Traducciones individuales
node vaishya-traducao-pt.js
node vaishya-traduccion-es.js
node vaishya-traduzione-it.js
node vaishya-anuvada-sa.js
```
Ejecuta la traducción de ML-KEM-768 y ML-DSA-65 para cada idioma: Portugués (LATAM), Español (LATAM), Sánscrito (BRICS), Italiano (Europa). Ejecuta el script general o cada traducción individualmente.

### **Capa 4 — Traducción semántica (UPI, CLP, TIPS ↔ Pix):**

```bash
node vaishya-upi-pix.js
node vaishya-clp-pix.js
node vaishya-tips-pix.js
```
Cada script imprime la **equivalencia de campos** entre el riel de pago especificado y Pix.
