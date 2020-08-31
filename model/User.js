//#region LIBs 
    "Use strict";
    const mongoose = require('mongoose');
    const Joi = require ('joi');
//#endregion
//----------------------------------------------------------------------------------------------------------------------
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    secret: {
        type: String,
        required:true,
        max: 1024,
        min:6
    }
});
const User = mongoose.model('User', schema);

const validationSchema = Joi.object({
    username: Joi.string()
            .min(6)
            .max(255)
            .required(),
    secret: Joi.string()
            .min(6)
            .max(1024)
            .required()
});

const validateUser = (user) => {
    return validationSchema.validate(user);
};

module.exports = User;
module.exports.validateUser = validateUser;
