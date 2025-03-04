const mongoose=require('mongoose') //module


const regSchema=mongoose.Schema({
    username:String,
    password:String
})





module.exports=mongoose.model('reg',regSchema)