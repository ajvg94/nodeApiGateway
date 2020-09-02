//#region LIBs 
    "Use strict";
    const jwt = require('jsonwebtoken');
    const moment  = require('moment');
    require ('dotenv').config();
//#endregion
//----------------------------------------------------------------------------------------------------------------------
//#region functions 
    module.exports = function (req, res, next) {
        console.log('['+moment().format("YYYY-MM-DD hh:mm:ss")+'] - ['+req.headers['x-forwarded-for']+'] - '+"Verify token: "+req.header('auth-token'));
        const token = req.header('auth-token');
        if(!token) {
            console.log("Access denied");
            return res.status(401).send("Access denied");
        }

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if(err){
                console.log("Invalid token");
                return res.status(403).send("Access denied");
            }
            console.log("Successfull login!");
            req.user = user;
            next();
        });
    };
//#endregion
//----------------------------------------------------------------------------------------------------------------------
