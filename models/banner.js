const mongoose=require('mongoose') //mongoose


const bannerSchema=mongoose.Schema({
    title:String,
    desc:String,
    img:String,
    moredetails:String
})





module.exports=mongoose.model('banner',bannerSchema)