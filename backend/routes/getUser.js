const express = require('express');
const router = express.Router({ mergeParams: true });
const userSchema = require('../models/User');
const fetchuser = require('../middleware/fetchuser')


router.get('/api/auth/getuser',fetchuser, async (req, res) => {
    try {
        const userId= req.user.id;
        const user = await userSchema.findById(userId).select('-password');
        res.json(user);
    }   
    catch (error) {
        console.log('error occured' + error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;