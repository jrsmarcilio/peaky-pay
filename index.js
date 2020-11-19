const express = require("express");
const app = express();

const port = 3000;

app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Servidor rodando na url http://localhost:${port}`);
});
