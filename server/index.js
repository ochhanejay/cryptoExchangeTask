const express = require("express");
const cors = require("cors");
const http = require('http');
const app = express();
const router = require("./routes/routes");
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

app.use("/api", router);

module.exports = app;
