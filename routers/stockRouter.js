const express = require("express");
const router = express.Router();
const {getAllStock,addStock} = require("../controllers/stockController.js");
const { getAccessToRoute} = require("../middleware/authMiddleware");



router.get("/",getAccessToRoute,getAllStock);
router.post("/add",getAccessToRoute,addStock);


module.exports = router;