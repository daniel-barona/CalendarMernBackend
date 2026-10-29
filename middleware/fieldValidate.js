const response = require('express')
const { validationResult } = require('express-validator')

const fieldValidate = (req, res=response, next) => {
    const errorMiddleware = validationResult( req )
        if( !errorMiddleware.isEmpty() ){
            return(
                res.status(400).json({
                    ok: false,
                    msg: 'check your information',
                    error: errorMiddleware.mapped()
                })
            )
        }

        next()
}

module.exports = {
    fieldValidate
}