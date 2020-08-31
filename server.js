//#region LIBs 
    "Use strict";
    const authRoute = require("./routes/auth");
    const express = require('express');
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');
    require ('dotenv').config();
//#endregion
//----------------------------------------------------------------------------------------------------------------------
//Express 
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.set('trust proxy',1);
//DB
    mongoose.connect(process.env.MONGO_DB_URL,{ useUnifiedTopology: true, useNewUrlParser: true},
        () => console.log('connected'));

//rutas
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


