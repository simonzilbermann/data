const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const requestIp = require("request-ip");
const useragent = require("useragent");
const path = require("path");
const hbs = require("hbs"); // Importer Handlebars
//טעינת משתני הסביבה לתוך אובייקט במערכת
require("dotenv").config();
// Middleware pour analyser les requêtes JSON et capturer l'IP
app.use(requestIp.mw());

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//טעינת מחרוזת ההתחברות מתוך משתנה הסביבה
const uri = process.env.MONGO_CONN_STR;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongo db connected");
  });

// Configurer le dossier public pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));
// Définir Handlebars comme moteur de template
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views")); // Spécifie le dossier des vues

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

const data_router = require("./api/v1/route/recolte-data");

app.use("/", data_router);

// Route d'accueil
app.get("/", (req, res) => {
  res.render("index"); // Rendre la vue index.hbs
});

app.get("/qwe", (req, res) => {
  res.render("qwe"); // Rendre la vue index.hbs
});

// Middleware pour gérer les erreurs 404 (route non trouvée)
app.all("*", (req, res) => {
  res.status(404).render("404"); // Rendre la vue 404.hbs
});

module.exports = app;
