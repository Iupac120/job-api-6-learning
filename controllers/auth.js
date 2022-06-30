
const user = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')




const register = async(req,res)=>{

    // const {name,email,password} = req.body
    // if(!name || !email || !password){
       
    //    res.status(StatusCodes.BAD_REQUEST).json({msg:'provide details'})
    // }
    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password,salt)
    // const tempUser = {
    //     name,
    //     email,
    //     password: hashedPassword
    // }
    // const newUser = await user.create({...tempUser})
   
    const newUser = await user.create({...req.body})
    const token = newUser.createJWT()

    console.log('register')
    res.status(StatusCodes.CREATED).json({User:{name:newUser.name},token})
}

const login = async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        throw new BadRequestError('please provide email and password')
    }
   
    const userNew = await user.findOne({email})
    if(!userNew){
        throw new UnauthenticatedError('Invalid credentials')
    
    }
    const isPasswordCorrect = await userNew.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid credentials')
    
    }
    console.log('one')
    const token = userNew.createJWT()
    res.status(StatusCodes.OK).json({user:{name:userNew.name},token})
}
module.exports = {
    register,
    login
}