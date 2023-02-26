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

//enable CORS 
app.use(cors({ origin: 'http://localhost:3000' ,
    credentials :  true,
    methods: 'GET,PUT,POST,OPTIONS,DELETE', 
    allowedHeaders: 'Content-Type,Authorization' }));

//import body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* import helmet */
/* app.use(helmet({referrerPolicy: { policy: "no-referrer" },})); */
app.use(helmet());

/* import morgan */
app.use(morgan('combined'));
/* import xss */

app.use(xss());

//parse application/json
app.use("/", mainRouter);
app.use("/img", express.static("./tmp"));
/* // catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
}); */
app.listen(port, () => console.log(`App listening on port:${port}`));
