const jwt = require('jsonwebtoken')


const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ error: 'Please authenticate using a valid token' })
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
      //  console.log('user found '+JSON.stringify(data.user))
        req.user = data.user;
        next();
    }
    catch (err) {
        res.status(401).json({ error: 'Please authenticate using a valid token' })

    }
}

module.exports = fetchUser;