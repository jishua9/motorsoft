const Joi = require("joi");

//register req validation

const registerValidation = (data) => {
    const joischema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(8).required(),
    });
    //prevalidation
    return joischema.validate(data);
};

const loginValidation = (data) => {
    const joischema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    //prevalidation
    return joischema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
