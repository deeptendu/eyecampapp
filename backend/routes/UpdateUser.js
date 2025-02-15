const express = require('express');
const router = express.Router({ mergeParams: true });
const userSchema = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



router.post('/api/auth/updateuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password length must be atleast 8 char').isLength({ min: 8 })
], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
   
    try {
        const salt=await bcrypt.genSalt(10);
        const securePassword= await bcrypt.hash(req.body.password,salt);
      
        user = await userSchema.updateOne({ email:req.body.email }, 
                        {  $set: {password: securePassword} });
        if(user?.modifiedCount>0)
            res.status(200).json({ message: "user password updated sucesfully" , user })
        else
            res.status(500).json({ error: `User Not Found with email ${req.body.email}` })

    }
    catch(error){
        console.log('error occured'+error);
        res.status(500).json({error:error.message});
    }
});

module.exports = router;