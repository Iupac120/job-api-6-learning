const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const jobSchema = new mongoose.Schema({
    company:{
        type: String,
        required: [true,'please provide company name'],
        maxlength: 50
        
    },
    position:{
        type: String,
        required: [true,'please provide email'],
        maxlength: 100
        
    },
    status:{
        type: String,
        enum:['interview','declined','pending'],
        default:'pending'
        
     },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:'User', //model is refering to which is User.js
        required:[true,'please provide user']
    }},{timestamps: true})

    module.exports = mongoose.model('job',jobSchema)