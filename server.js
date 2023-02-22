const express = require("express");
require("dotenv").config();
const cors = require("cors");//cors
const helmet = require("helmet");//helmet
const morgan = require("morgan");//morgan
const xss = require("xss-clean");
const bodyParser = require("body-parser");//body-passer

const mainRouter = require("./src/routes");
const app = express();
const port = process.env.PORT || 3000;

// enabling CORS for some specific origins only.
let corsOptions = {
    origin: ['http://127.0.0.1'],
    method: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    alloweHeaders:['Content-Type','Authorization']
}
app.use(cors(corsOptions));
//import body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* import helmet */
/* app.use(helmet({referrerPolicy: { policy: "no-referrer" },})); */
app.use(helmet());

/* import morgan */
app.use(morgan('combined'));
/* import cors */
// app.use(cors({origin: "*"   }));
app.use(xss());

//parse application/json
app.use("/", mainRouter);

app.listen(port, () => console.log(`App listening on port:${port}`));
