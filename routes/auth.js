//#region LIBs 
    "Use strict";
    const router = require('express').Router();
    const User = require('../model/User');
    const {validateUser}= require('../model/User');
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const moment  = require('moment');
    const ipFiltering = require('../middlewares/ipFiltering');
    require ('dotenv').config();
//#endregion
//----------------------------------------------------------------------------------------------------------------------
//#region routes 
    router.post('/register', ipFiltering, async(req,res) => {
        console.log('['+moment().format("YYYY-MM-DD hh:mm:ss")+'] - ['+req.ip+'] - '+"Register user: "+JSON.stringify(req.body));

        //validate user information
        const { error } = validateUser(req.body);
        if(error) {
            console.log(error.details[0].message);
            return res.status(400).send(error.details[0].message);
        }
        
        //unique username
        const userExists = await User.findOne({ username: req.body.username });
        
        if(userExists) {
            console.log("Error: User already exists");
            return res.status(400).send("User already exists");
        }

        //Hash password
        const salt = await bcrypt.genSalt(7);
        const hashPassword = await bcrypt.hash(req.body.secret, salt);

        const user = new User({
            username: req.body.username,
            secret: hashPassword
        });

        try{
            const savedUser = await user.save();
            console.log("User created successfully");
            res.status(200).send("User created successfully");
        }catch (err){
            console.log(err);
            res.status(400).send(err);
        }
    });

    router.post('/login', async (req,res) => {
        console.log('['+moment().format("YYYY-MM-DD hh:mm:ss")+'] - ['+req.ip+'] - '+"Login user: "+JSON.stringify(req.body));

        //validate user information
        const { error } = validateUser(req.body);
        if(error) {
            console.log(error.details[0].message);
            return res.status(400).send(error.details[0].message);
        }
        

        //username check
        const user = await User.findOne({ username: req.body.username });
        if(!user) {
            console.log("Wrong username");
            return res.status(400).send("Wrong username or secret");
        }
        
        //password check
        const validPass = await bcrypt.compare(req.body.secret, user.secret);
        if(!validPass) {
            console.log("Wrong secret");
            return res.status(400).send("Wrong username or secret");
        }
       

        //create token
        const accessToken = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, { expiresIn: '2m'});
        //const refreshToken = jwt.sign({_id: user._id}, process.env.REFRESH_TOKEN_SECRET);
        console.log("Generated tokens: "+ JSON.stringify({ accessToken: accessToken/*, refreshToken: refreshToken*/}));
        res.json({ accessToken: accessToken/*, refreshToken: refreshToken*/});

    });
//#endregion
//----------------------------------------------------------------------------------------------------------------------
module.exports = router;