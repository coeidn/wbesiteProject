const mongoose=require('mongoose')


const serviceSchema=mongoose.Schema({
    img:String,
    title:String,
    desc:String,
    mdetails:String,
    status:{type:String,default:'Unpublished'},
    createdate:Date
})





module.exports=mongoose.model('service',serviceSchema)