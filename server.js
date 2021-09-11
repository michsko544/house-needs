const express = require("express");
const path = require("path");
var enforce = require("express-sslify");
const app = express();
const PORT = process.env.PORT || 80;

app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use(express.static(path.join(__dirname, "build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT);
