const router = require("express").Router();
const { save_data, Get_all } = require("../controller/recolte-data");

router.post("/save_data", save_data);
router.get("/Get_all", Get_all);

module.exports = router;
