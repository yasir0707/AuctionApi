const express = require('express');
const app = express();
const cors = require('cors');
const body = require('body-parser');
const router = express.Router();
const port = 7000 ||process.env.port;


app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
  next()}
 );
 app.use(cors());
 app.use(express.json());
 app.use(body.urlencoded({ extended: false }));
app.use(body.json());


//swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.get("/", (req, res) => {
  res.send(`<h1>Auction API</h1><a href="/api-docs">Documentation</a>`);
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));




app.use('/seller',require('./routes/Seller'))

  app.listen(port,()=>{console.log(port)});