const { response } = require("express")
const jwt = require("jsonwebtoken")


const JWTvalidate = (req, res = response, next) => {

    // recibir el JWT (x-token en los headers)
    const token = req.header('x-token')

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'Failed to get token'
        })
    }

    try {

        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )

        req.uid = payload.uid
        req.name = payload.name
        
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Unauthorized token'
        })
    }

    next()
    

}

module.exports = {
    JWTvalidate
}