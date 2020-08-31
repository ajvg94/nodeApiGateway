//#region LIBs 
    "Use strict";
    const router = require('express').Router();
    const User = require('../model/User');
    const {validateUser}= require('../model/User');
    const bcrypt = require('bcrypt');
//#endregion
//----------------------------------------------------------------------------------------------------------------------
//#region routes 
    router.post('/register', async(req,res) =>{
        console.log("");
        console.log(req.body);

        //validate user information
        const { error } = validateUser(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        //unique username
        const userExists = await User.findOne({ username: req.body.username });
        if(userExists) return res.status(400).send("User already exists");

        //Hash password
        const salt = await bcrypt.genSalt(7);
        const hashPassword = await bcrypt.hash(req.body.secret, salt);

        //create user
        const user = new User({
            username: req.body.username,
            secret: hashPassword
        });
        try{
            const savedUser = await user.save();
            res.send(savedUser._id);
        }catch (e){
            res.status(400).send(e);
        }

    });

    router.post('/login', (req,res)=>{
        console.log("");
        console.log(req.body);

        //validate user information
        const { error } = validateUser(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        
    });
//#endregion
//----------------------------------------------------------------------------------------------------------------------
module.exports = router;