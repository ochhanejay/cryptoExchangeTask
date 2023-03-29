
const router = require("express").Router();
const exchangeController = require("../controller/exchangeController");


router.post("/addExchange", exchangeController.addExchangeData);
router.get("/getExchange", exchangeController.getExchangeList);



module.exports = router;
