// Toujours commencer par importer les variables d'environnement !
require("dotenv").config();
const express = require("express");
const session = require("express-session");


// on importe le router
const router = require("./app/router");

// un peu de config
const PORT = process.env.PORT || 5000;


const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET, // Permet de générer la sessionId. 'seed' (graine) pour générer automatique un ID securisé - une chaine de caractère aléatoire pour permettre l'aléatoire - c'est la clé de chiffrement
  resave: false, // ne pas re-sauvegarder la session si celle-ci n'a pas été modifié
  saveUninitialized: true, // sauvegarde là au début même s'il n'y a rien dedans
  cookie: { // Paramétrage des cookies envoyés au serveur
    secure: false, // false car on est en HTTP et pas en HTTPS pour le moment
    maxAge: 15 * 60 * 1000 // durée de vie max : 15 minutes en MS
  }
}));

// app.use((req, res, next) => {
//   const session = req.session;
//   app.locals.session = session;

//   next();
// });

// servir les fichiers statiques qui sont dans "integration"
app.use(express.static("integration"));
//config ejs
app.set("view engine", "ejs");
app.set("views", "./app/views");

// routage !
app.use(router);


// on lance le serveur
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});


