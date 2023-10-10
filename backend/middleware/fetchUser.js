const jwt = require('jsonwebtoken')

const JWT_SECRET = 'Abb@sIsaVeryG00dB0y'

const fetchUser = (req, res, next)=>{
    // Get the User from the jwt Token and add id to req object
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).send({error: "Please authenticate using a valid token"})
    }
    
    try {
        const data = jwt.verify(token , JWT_SECRET);
        req.user = data.user;
        
    } catch (error) {
        return res.status(401).send({error: "Please authenticate using a valid token"})
    }

    next()
}

module.exports = fetchUser;