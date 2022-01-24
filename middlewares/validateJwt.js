const {response} = require("express")
const jwt = require("jsonwebtoken")
const {ERRORNOTOKEN, ERRORNOVALIDTOKEN} = require("../constants")

const validateJwt = (req, res = response, next) => {
    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:ERRORNOTOKEN
        })
    }

    try{
        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )
        req.uid = uid
        req.name = name

    } catch(error){
        return res.status(401).json({
            ok:false,
            msg:ERRORNOVALIDTOKEN
        })
    }
    next()
}

module.exports = validateJwt