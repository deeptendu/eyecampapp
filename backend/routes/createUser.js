const express = require('express');
const router = express.Router({ mergeParams: true });
const userSchema = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



router.post('/api/auth/createuser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password length must be atleast 8 char').isLength({ min: 8 })
], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    let user = await userSchema.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ error: "user already exist with this email id " + req.body.email })
    }
    try {
        const salt=await bcrypt.genSalt(10);
        const securePassword= await bcrypt.hash(req.body.password,salt);
        user = await userSchema.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        })
        res.json({ message: "user created sucesfully" })
    }
    catch(error){
        console.log('error occured'+error);
        res.status(500).json({error:error.message});
    }
});

module.exports = router;