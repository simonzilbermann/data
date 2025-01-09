const express = require("express");
const requestIp = require("request-ip");
const useragent = require("useragent");
const IPS = require("../model/recolte-data");
const mongoose = require("mongoose");

module.exports = {
 save_data: async (req, res) => {
    try {
      let ip = requestIp.getClientIp(req);
      console.log("IP initiale :", ip);

      if (ip === "::1" || ip === "127.0.0.1") {
        ip = "127.0.0.1"; // Force l'adresse IPv4 locale
      }

      if (req.headers["x-forwarded-for"]) {
        ip = req.headers["x-forwarded-for"].split(",")[0].trim();
        console.log("Nouvelle IP à partir de 'x-forwarded-for' :", ip);
      }

      const agent = useragent.parse(req.headers["user-agent"]);

      // Obtenir les données de géolocalisation
      const geoResponse = await axios.get(`http://ip-api.com/json/${ip}`);
      const geoData = geoResponse.data;

      // Vérifiez si la requête de géolocalisation est réussie
      if (geoData.status !== "success") {
        console.error("Erreur de géolocalisation :", geoData.message);
        throw new Error(
          "Impossible de récupérer les données de géolocalisation"
        );
      }

      const { lat, lon } = geoData;

      const new_data = new IPS({
        _id: new mongoose.Types.ObjectId(),
        addressIp: ip,
        browser: agent.toAgent(),
        os: agent.os.toString(),
        device: agent.device.toString(),
        date: new Date(),
        latitude: lat, // Latitude obtenue
        longitude: lon, // Longitude obtenue
      });

      await new_data.save();

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
