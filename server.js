const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mainRouter = require("./src/routes");

const app = express();
const port = process.env.PORT || 4000;

//import body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
// enabling CORS for some specific origins only.
let corsOptions = {
    origin: ['http://localhost:4000'],
    method: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    alloweHeaders:['Content-Type','Authorization']
}

app.use(cors(corsOptions))
app.use(cors({origin: "*"   }));
//parse application/json
app.use(bodyParser.json());
app.use("/", cors(),mainRouter);


app.listen(port, () => console.log(`App listening on port:${port}`));
