const jwt    = require('jsonwebtoken');

const config = require('config');

// this part is for route we choose to protect for example => GET api/auth
// this function has access to req and res cycle

module.exports = function(req, res, next) {
    // Get the token from header
    // x-auth-token = key of the token inside the header
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg : 'Authorization denied'})
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({msg : 'Token is not valid'})
    }

}



