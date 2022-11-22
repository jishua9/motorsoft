const router = require("express").Router();
const { registerValidation, loginValidation } = require("../Validation");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
const { data } = require("joi");
require("dotenv").config();

const date = new Date();

///////////////////////////////////////
//////////////REGISTER/////////////////
///////////////////////////////////////
router.post("/register", async (req, res) => {
    //validate
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //checking email in database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send("Email already exists");
    }

    //Hash password
    const salt = await bycrypt.genSalt(10);
    const hashpassword = await bycrypt.hash(req.body.password, salt);

    //create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpassword,
    });
    console.log(user);
    //submit new user
    try {
        const savedUser = await user.save();
        res.send({ user: user._id, date: user.date });
    } catch (error) {
        res.status(400).send(error);
    }
});

///////////////////////////////////////
/////////////////LOGIN/////////////////
///////////////////////////////////////

router.post("/login", async (req, res) => {
    //validate
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //confirm
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).json({
            date: date,
            message: "Authentication failed. Username or Password incorrect.",
        });
    }

    //password confirmation
    const validPass = await bycrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(401).json({
            date: date,
            message: "Authentication failed. Username or Password incorrect.",
        });
    }

    //create token

    const token = jwt.sign(
        {
            _id: user._id,
            email: user.email,
        },
        process.env.TOKEN_SECRET
    );
    res.header("auth-token", token).send(token);
    console.log(date + " Login request for " + user.email);
});

module.exports = router;
