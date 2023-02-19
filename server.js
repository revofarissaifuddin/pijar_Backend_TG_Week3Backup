const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mainRouter = require("./src/routes");

const app = express();
const port = process.env.PORT || 4000;

//import body parser
app.use(bodyParser.urlencoded({ extended: true }));
//parse application/json
app.use(bodyParser.json());
app.use("/", mainRouter);

app.listen(port, () => console.log(`App listening on port:${port}`));
