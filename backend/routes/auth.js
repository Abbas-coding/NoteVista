const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body ,validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'Abb@sIsaVeryG00dB0y'


// Create a User using: POST at /api/auth/createuser, No login required

router.post('/createuser',[
    body('name', 'Enter a Valid Name').isLength({min : 3}),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min : 5})

],async(req, res)=>{
    // If there are errors, return Bad request along with the error
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    // Check whether the user with this email exists already
    try {
    let user = await User.findOne({email : req.body.email})
    if (user){
        return res.status(400).json({error: "Sorry a user with this email already exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)

    // create a new user
     user = await User.create({
        name : req.body.name,
        password: secPass,
        email: req.body.email,
    });

    const data = {
        user:{
            id: user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({authToken})
    // res.json(user)
} catch (error) {
        console.error(error.message)
        res.status(500).send('some Error occured');
}
})

module.exports = router;