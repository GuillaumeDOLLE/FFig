// 1. require le module
const { Client } = require("pg");

// 2. Créer un client
const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
});

// 3. Connecter le client
client.connect((error) => {
  if (error) {
    console.error("Une erreur a lieu à la connexion avec notre BDD : ", error.message);
  } else {
    console.log("Connection à la BDD réussie !");
  }
});

// 4. Exporter le client connecté
module.exports = client;