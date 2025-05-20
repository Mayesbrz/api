# TP – Sécurisation d'une API Node.js avec JWT, Helmet, HTTPS et plus

**Nom : Amayas Bariz**  

## Étapes réalisées

### 1. Authentification

- Mise en place d’un endpoint `/login` qui génère un **token ** signé à l’aide d’une clé secrète stockée dans `.env`.
- Ce token contient l’`id` de l’utilisateur et est valable pendant 2 heures.
- Le token est envoyé dans les headers avec `Authorization: Bearer TOKEN`.

### 2. Middleware `authMiddleware`

- Création d’un middleware qui vérifie le token.
- Si le token est valide : on accède à la route.
- Si le token est absent ou invalide : retour `401` ou `403`.

### 3.  Protection des routes `/albums` et `/photos`

- Toutes les routes `GET`, `POST`, `PUT`, `DELETE` concernant les albums et photos sont **protégées avec le middleware JWT**.

### 4.  Sécurité HTTP avec Helmet et CORS

- Ajout de `helmet()` pour sécuriser les headers HTTP.
- Configuration de `cors()` pour accepter uniquement certaines origines et méthodes.

### 5.  Rate Limiting

- Utilisation de `express-rate-limit` pour limiter chaque IP à **100 requêtes par heure**.

### 6.  HTTPS local

- Génération de certificats SSL (`cert.pem`, `key.pem`) via OpenSSL.
- Création d’un serveur HTTPS (`server-https.mjs`) écoutant sur le port `3443`.

### 7.  Gestion des erreurs centralisée

- Ajout d’un middleware `errorHandler.mjs` qui capture et renvoie les erreurs propres, sans exposer les détails techniques.

### 8. Tests de sécurité

- Utilisation de `curl` pour tester les endpoints avec et sans token.
- Validation que :
  - sans token → `401`
  - token invalide → `403`
  - token valide → `200` + données protégées

---


## Résultat

L'API est maintenant **sécurisée**, **authentifiée**, et **chiffrée**. L'accès aux ressources sensibles est protégé et conforme aux bonnes pratiques.

