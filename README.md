# Lit Protocol Integration

## Description

Ce projet est une démonstration d'intégration du protocole Lit, un réseau décentralisé de sécurité et d'identité. Il permet de :

- Chiffrer des messages avec des conditions d'accès personnalisées
- Déchiffrer des messages en vérifiant les conditions d'accès
- Gérer différents types de conditions (solde ETH, NFT, tokens)
- Interagir avec plusieurs chaînes de blocs

## Technologies utilisées

- **TypeScript**
- **Node.js**
- **ethers.js**
- **Lit Protocol SDK** (`@lit-protocol`)

## Installation

```bash
# Installer les dépendances
pnpm install

# Configurer les variables d'environnement et ajouter votre clé privée (PRIVATE_KEY)
cp .env.example .env

# Lancer les tests
pnpm test
```

## Utilisation

### Exemple de code TypeScript :

```typescript
// Initialiser le client Lit
const litClient = await initializeLitClient();

// Créer des conditions d'accès en spécifiant la chaîne (exemple avec un solde en ETH minimum)
const conditions = createBalanceConditions("ethereum", "0.006");

// Chiffrer un message
const encrypted = await encrypt(litClient, "Message secret", conditions);

// Déchiffrer le message
const decrypted = await decrypt(litClient, encrypted, "ethereum", wallet);
```

## Types de conditions supportées

1. **Solde ETH**
2. **NFTs**
3. **Tokens ERC20**

## Chaînes supportées

Le projet supporte de nombreuses chaînes, notamment :

- Ethereum
- Polygon
- Arbitrum
- Optimism
- Base
- _Et bien d'autres_

## Ressources utiles

- [Documentation Lit Protocol](https://litprotocol.com/docs)

## ⚠️ Note

Ce projet utilise le réseau de test **Datil** de Lit Protocol. Pour une utilisation en production, configurez le réseau approprié dans `config/lit.ts`.

## Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une **issue** sur le repository ou à me contacter directement !

```
contact@lorcannrauzduel.fr
```
