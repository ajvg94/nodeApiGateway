//#region LIBs 
    "Use strict";
    const router = require('express').Router();
    const moment  = require('moment');
    const verifyToken = require('../middlewares/verifyToken');
//#endregion
//----------------------------------------------------------------------------------------------------------------------
//#region Protecteed routes 
    router.get('/', verifyToken,(req,res) =>{
        console.log('['+moment().format("YYYY-MM-DD hh:mm:ss")+'] - ['+req.headers['x-forwarded-for']+'] - '+"Protected: "+JSON.stringify(req.body));

        res.json(
            {
                message: "Logged in!"
            }
        );
    });
//#endregion
//----------------------------------------------------------------------------------------------------------------------
module.exports = router;

