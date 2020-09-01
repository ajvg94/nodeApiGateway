//#region LIBs 
    "Use strict";
    const moment  = require('moment');
//#endregion
//----------------------------------------------------------------------------------------------------------------------
//#region IPs
    const ips = ['127.0.0.1','localhost','::1'];//localhost
//#endregion
//----------------------------------------------------------------------------------------------------------------------
//#region functions 
module.exports = function (req, res, next) {
    console.log('['+moment().format("YYYY-MM-DD hh:mm:ss")+'] - ['+req.ip+'] - '+"Verifying IP address...");
    
    if(!req.ip) {
        console.log("Invalid IP address");
        return res.status(403).send("Invalid IP address");
    }

    if(ips.includes(req.ip.toString())){
        console.log("Successfully verified");
        next();
    }else{
        console.log("Invalid IP address");
        return res.status(403).send("Access denied");
    }
};
//#endregion
//----------------------------------------------------------------------------------------------------------------------
