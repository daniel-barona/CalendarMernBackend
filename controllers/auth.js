const { response } = require('express')
const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')

//GET
//RenewToken
const RenewToken = async(req, res = response) => {

    const uid = req.uid 
    const name = req.name

    const user = await User.findById( uid )

    //generar nuevo JWT
    const token  = await generateJWT( uid, name )

    res.json({
        ok: true,
        msg: 'Renew Token',
        uid,
        name,
        email: user?.email,
        token
    })
    
}

//POST
//createUser
const createUser = async(req, res = response) => {

    const { email, password } = req.body

    //validación con la BD

    try {
        
        let user = await User.findOne({ email })
        console.log('[auth.createUser] email:', email, '| ya existe:', !!user)

        if( user ){
            return res.status(400).json({
                ok: false,
                msg: 'your email already exist in the app'
            })
        }
        
        user = new User( req.body )

        //encriptar la contraseña
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync( password, salt )
    
        await user.save()

        // Generar JWT 
        const token  = await generateJWT( user.id, user.name )

        console.log('[auth.createUser] usuario creado:', {
            uid: user.id,
            name: user.name,
            email: user.email
        })
    
        res.status(201).json({
            ok: true,
            msg: 'New user',
            uid: user.id,
            name: user.name,
            email: user.email,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please check your information or send a ticket for the admin'
        })        
    }   
}

//LoginUser
const LoginUser = async(req, res = response) => {
    const {email, password} = req.body

    try {

        const user = await User.findOne({ email })
        console.log('[auth.LoginUser] intento de login:', email, '| usuario encontrado:', !!user)

        if( !user ){
            return res.status(400).json({
                ok: false,
                msg: 'wrong email or password, check your information!'
            })
        }

        //confirmar passwords

        const validatePassword = bcrypt.compareSync( password, user.password );

        if (!validatePassword) {
            return res.status(400).json({
                ok: false,
                msg: 'wrong password, check your information!'
            })
        }

        // Generar JWT 
        const token  = await generateJWT( user.id, user.name )

        console.log('[auth.LoginUser] login exitoso:', {
            uid: user.id,
            name: user.name,
            email: user.email
        })
        
        res.status(200).json({
            ok: true,
            msg: 'Welcome again',
            uid: user.id,
            name: user.name,
            email: user.email,
            token
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please check your information or send a ticket for the admin'
        })
    }
    
}
module.exports = {
    RenewToken,
    createUser,
    LoginUser
}