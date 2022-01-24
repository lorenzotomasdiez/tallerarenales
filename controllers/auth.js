const { response } = require("express")
const bcryptjs = require("bcryptjs")
const User = require("../models/User")
const generateJwt = require("../helpers/jwt")
const { ERROR500, ERRORUSEREXISTS} = require("../constants")

//CREATE USER
const createUser = async (req, res = response) => {
    console.log('Create User Service')
    const {email, password} = req.body
    try {
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                ok:false,
                msg:ERRORUSEREXISTS
            })
        }

        user = new User(req.body)
        //encriptar password
        const salt = bcryptjs.genSaltSync()
        user.password = bcryptjs.hashSync(password, salt)
        await user.save()

        //generate JWT
        const token = await generateJwt(user.id, user.name)

        res.status(201).json({
            ok:true,
            uid:user.id,
            name:user.name,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:ERROR500('creacion de usuario')
        })
    }
}

//LOGIN USER
const loginUser = async (req, res = response) => {
    console.log('Login User Service')
    const {email, password} = req.body
    try {
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                ok:false,
                msg:'Usuario inexistente'
            })
        }

        const validPassword = bcryptjs.compareSync(password, user.password)
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Invalid password'
            })
        }

        //Generar el JWT
        const token = await generateJwt(user.id, user.name)

        res.json({
            ok:true,
            uid:user.id,
            name:user.name,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:ERROR500('autenticacion')
        })
    }
}

const revalidToken = async (req, res = response) => {
    console.log('Revalid Token Service')
    const {uid, name} = req
    const token = await generateJwt(uid, name)

    res.json({
        ok:true,
        msg:'revalidToken',
        uid:uid,
        name:name,
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    revalidToken,
}