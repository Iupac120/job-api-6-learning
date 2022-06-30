const userToken = require('../models/User')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')



const auth = async(req,res,next)=>{
    console.log('auth')
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('authentication invalid')
    }
    const token = authHeader.split(' ')[1]
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {userId:decode.userId,name: decode.name}
        console.log(token)
        next()
    }catch(err){
        throw new UnauthenticatedError('authentication invalid')
        
    }
}


module.exports = auth