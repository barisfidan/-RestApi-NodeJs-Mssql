const express = require("express");
const stock = require("./stockRouter");
const auth = require("./authRouter")


//api

const router = express.Router();


router.use("/stock",stock);
router.use("/auth",auth);



module.exports = router;