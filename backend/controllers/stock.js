const _ = require("lodash");
const Stock = require("../model/stock");
const csv = require("fast-csv");
const fs = require("fs");

exports.getStock = (req, res) => {
  Stock.find({ name: req.params.stockTicker }, (err, stocks) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json(stocks);
  });
};

exports.allStocks = (req, res) => {
  Stock.find((err, stocks) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json(stocks);
  });
};

exports.updateStocks = (req, res) => {
  Stock.deleteMany({}, (err) => {
    if (err) {
      console.error(err);
    }
  });

  fs.readdirSync("data/").forEach((file) => {
    fs.createReadStream(`data/${file}`)
      .pipe(csv.parse({ headers: true }))
      .on("data", (row) => {
        const document = new Stock(row);
        document.name = file.split(".")[0];
        document.save((err) => {
          if (err) {
            console.error(err);
          }
        });
      });
  });

  res.json("Stocks updated");
};
