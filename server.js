//#region LIBs 
    "Use strict";
    const authRoute = require("./routes/auth");
    const express = require('express');
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');
    require ('dotenv').config();
    const rateLimit = require("express-rate-limit");
    const slowDown = require("express-slow-down");
    const hpp = require('hpp');
    const helmet = require("helmet");
    var cors = require('cors') ;
//#endregion
//----------------------------------------------------------------------------------------------------------------------
//#region APP-CONFIG 
//Express 
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.enable("trust proxy");
//DB
    mongoose.connect(process.env.MONGO_DB_URL,{ useUnifiedTopology: true, useNewUrlParser: true},
        () => console.log('connected'));

//Rate-limit
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    });
    app.use(limiter);

//Slow-down
    const speedLimiter = slowDown({
        windowMs: 15 * 60 * 1000, // 15 minutes
        delayAfter: 100, // allow 100 requests per 15 minutes
        delayMs: 500 //increase 500ms each request
    });
    app.use(speedLimiter);

//HPP
    app.use(hpp());

//Too Busy
    app.use(function(req, res, next) {
        if (toobusy()) {
            res.send(503, "Server busy try again later.");
        } else {
            next();
        }
    });
//Helmet
    app.use(helmet());

//Cors
    app.use(cors());
//#endregion
//----------------------------------------------------------------------------------------------------------------------
//RUTAS
    app.use('/api/user', authRoute);
//----------------------------------------------------------------------------------------------------------------------
    const port = process.env.PORT;
    console.clear();
//HTTP
    const server = require('http').createServer(app).listen(process.env.PORT, () => {
        console.log('Listening on: http://localhost:'+process.env.PORT);
    });
//HTTPS
    /*const server = https.createServer({
        key: fs.readFileSync('ssl/server.key'), 
        cert: fs.readFileSync('ssl/server.cert') 
    }, app).listen(port, () => {
        console.log('Listening on port: '+port);
    });*/
//APP
    /*app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });*/


