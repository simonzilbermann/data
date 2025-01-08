const express = require("express");
const requestIp = require("request-ip");
const useragent = require("useragent");
const IPS = require("../model/recolte-data");
const mongoose = require("mongoose");

module.exports = {
  save_data: async (req, res) => {
    try {
      // Récupérer l'IP à partir de la requête
      let ip = requestIp.getClientIp(req);
      console.log("IP initiale :", ip); // Afficher l'IP récupérée

      // Si l'IP est en IPv6 locale "::1" ou "127.0.0.1", la forcer à "127.0.0.1"
      if (ip === "::1" || ip === "127.0.0.1") {
        ip = "127.0.0.1"; // Force l'adresse IPv4 locale
      }

      // Si l'IP vient de l'en-tête "x-forwarded-for", l'extraire
      if (req.headers["x-forwarded-for"]) {
        ip = req.headers["x-forwarded-for"].split(",")[0].trim(); // Prendre la première IP dans l'en-tête
        console.log("Nouvelle IP à partir de 'x-forwarded-for' :", ip); // Afficher l'IP après extraction
      }

      // Analyser le user-agent
      const agent = useragent.parse(req.headers["user-agent"]);

      // Créer un nouvel enregistrement de données
      const new_data = new IPS({
        _id: new mongoose.Types.ObjectId(),
        addressIp: ip, // L'adresse IP obtenue est maintenant toujours en IPv4
        browser: agent.toAgent(),
        os: agent.os.toString(),
        device: agent.device.toString(),
        date: new Date(),
      });

      // Sauvegarder les données dans la base de données
      await new_data.save();

      // Répondre avec un message de succès
      res
        .status(200)
        .send({ message: "Données sauvegardées avec succès", data: new_data });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Erreur lors de la sauvegarde des données" });
    }
  },

  Get_all: (req, res) => {
    IPS.find({}, { _id: false }).then((data) => {
      //console.log(data);
      return res.status(200).json({ msg: data });
    });
  },
};
