const mongoose=require('mongoose')


const addressSchema=mongoose.Schema({
    add:String,
    tel:Number,
    whatsup:Number,
    mobile:Number,
    email:String,
    in:String
})



module.exports=mongoose.model('address',addressSchema)