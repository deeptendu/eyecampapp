const express = require('express');
const router = express.Router({ mergeParams: true });
const userSchema = require('../models/User');


router.post('/api/auth/checkuser', async (req, res) => {
    try {
        const user = await userSchema.findOne({ email: req.body.email }).select('-password');
        if (user)
            res.status(200).json({ message: "user exist", user });
        else
            res.status(500).json({ error: `user does not exist ${req.body.email}` });
    }
    catch (error) {
        console.log('error occured' + error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;