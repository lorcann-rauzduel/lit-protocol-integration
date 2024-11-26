# Lit Protocol Integration

## Description

Ce projet est une démonstration d'intégration du protocole Lit, un réseau décentralisé de sécurité et d'identité.

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

// Exemple : Condition d'un solde minimum en ETH
const balanceConditions = createBalanceConditions("ethereum", "0.006");

// Chiffrer un message
const encrypted = await encrypt(litClient, "Message secret", conditions);

// Déchiffrer le message
const decrypted = await decrypt(litClient, encrypted, "ethereum", wallet);
```

## Exemples de conditions supportées

Lit Protocol permet d'utiliser des conditions d'accès basées sur des données on-chain et off-chain. Les conditions peuvent être combinées pour créer des règles d'accès complexes et personnalisées.

- **JWT** - Vérification d'un JWT
- **Solde ETH ou ERC20** - Vérification du solde minimum en ETH ou ERC20 sur une chaîne spécifique
- **NFTs (ERC-721)** - Possession d'un NFT
- **DAO** - Appartenance à une DAO
- **Smart contracts** - Résultat de n'importe quel appel de smart contract
- **APIs externes** - Intégration de données off-chain via des appels API
- [_Voir la documentation de Lit Protocol pour plus de détails_](https://developer.litprotocol.com/sdk/access-control/evm/basic-examples)

## Chaînes supportées

Le projet supporte de nombreuses chaînes, notamment :

- Ethereum
- Polygon
- Arbitrum
- Optimism
- Base
- _Et bien d'autres_

## Ressources utiles

- [Documentation Lit Protocol](https://developer.litprotocol.com/)

## ⚠️ Note

Ce projet utilise le réseau de test **Datil** de Lit Protocol. Pour une utilisation en production, configurez le réseau approprié dans `config/lit.ts`.

## Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une **issue** sur le repository ou à me contacter directement !

```

contact@lorcannrauzduel.fr

```
