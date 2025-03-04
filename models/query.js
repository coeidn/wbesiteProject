const mongoose=require('mongoose')


const querySchema=mongoose.Schema({
    email:String,
    query:String,
    status:{type:String,default:'Unreply'},
    postedDate:{type:Date,default:Date.now()}
})





module.exports=mongoose.model('query',querySchema)