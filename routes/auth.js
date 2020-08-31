//#region LIBs 
    "Use strict";
    const router = require('express').Router();
    const User = require('../model/User');
    const {validateUser}= require('../model/User');
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
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

    });

    router.post('/login', async (req,res) => {
        console.log("");
        console.log(req.body);

        //validate user information
        const { error } = validateUser(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        //username exists
        const user = await User.findOne({ username: req.body.username });
        if(!user) return res.status(400).send("Wrong username or secret");
        //if(!user) return res.status(400).send("Wrong username");

        const validPass = await bcrypt.compare(req.body.secret, user.secret);
        if(!validPass) return res.status(400).send("Wrong username or secret");
        //if(!validPass) return res.status(400).send("Wrong secret");

        //Create token
        const token = jwt.sign({_id: user._id});

        res.send('Logged in!');

    });
//#endregion
//----------------------------------------------------------------------------------------------------------------------
module.exports = router;