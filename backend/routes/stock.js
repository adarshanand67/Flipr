const express = require("express");
const {
  stockByTicker,
  allStocks,
  updateStocks,
  getStock,
} = require("../controllers/stock");
// const { requireSignin } = require("../controllers/user");

const router = express.Router();

router.get("/stocks", allStocks);
router.put("/stocks", updateStocks);
router.get("/stocks/:stockTicker", getStock);

router.param("stockTicker", stockByTicker);

module.exports = router;
