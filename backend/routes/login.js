const express = require('express');
const router = express.Router({ mergeParams: true });
const userSchema = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = require('../config');

router.post('/api/auth/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').exists()
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    let user = await userSchema.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ error: "Email id not registered ->" + req.body.email })
    }

    try {
        let isValid = await bcrypt.compare(req.body.password, user.password);
        if (isValid) {
            const token = jwt.sign({
                user: { id: user.id ,
                    email:user.email
                }
            }, JWT_SECRET)
            return res.json({ token: token })
        }
        else{
            return res.status(400).json({ error: "Please enter a valid password"})
        }
        
    }
    catch (error) {
        console.log('error occured' + error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;