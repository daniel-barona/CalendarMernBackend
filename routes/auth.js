const { Router } = require('express')
const { check } = require('express-validator')

const router = Router()

const { RenewToken, createUser, LoginUser } = require('../controllers/auth')
const { fieldValidate } = require('../middleware/fieldValidate')
const { JWTvalidate } = require('../middleware/JWTvalidate')

//GET 

//renew token
router.get('/renew', JWTvalidate ,RenewToken )

//POST

//new user (api/auth/new)
router.post('/new',[
    //middlewares
    check('name', 'Complete the space (name)').not().isEmpty(),
    check('email', 'Complete the space (email)').isEmail(),
    check('password', 'Complete the space (password)').isLength({ min:6 }),
    fieldValidate
], createUser)

//login 
router.post('/',[
    //middlewares
    check('email', 'Complete the space (email)').isEmail(),
    check('password', 'Complete the space (password)').isLength({ min:6 }),
    fieldValidate 
], LoginUser)



module.exports = router