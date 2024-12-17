const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const stockRoutes = require("./routes/stock");

dotenv.config();

const app = express();
const port = process.env.PORT || 8081;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", stockRoutes);

app.use("/", (req, res) => {
  fs.readFile("docs/apiDocs.json", (err, data) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json(JSON.parse(data));
  });
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorised!" });
  } else {
    next(err);
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) =>
  console.log(`DB connection error: ${err.message}`)
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
