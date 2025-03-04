const mongoose=require('mongoose')


const testiSchema=mongoose.Schema({
    img:{type:String,required:true,default:'default.webp'},
    quotes:{type:String,required:true},
    name:{type:String,required:true},
    status:{type:String,default:'Unpublished'},
    postedDate:{type:Date,default:new Date()}
})


module.exports=mongoose.model('testi',testiSchema)