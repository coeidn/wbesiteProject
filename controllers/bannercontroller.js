const Banner=require('../models/banner') //model
const Address=require('../models/address')

    





exports.bannerSelection=async(req,res)=>{
    const username=req.session.username
    const record=await Banner.findOne()
    res.render('admin/banner.ejs',{username,record})
}

exports.bannerupdateform=async(req,res)=>{
    const username=req.session.username
    const record=await Banner.findOne()
    res.render('admin/bannerupdateform.ejs',{username,record})
}

exports.bannerupdate=async(req,res)=>{

    const{title,desc,mdetails}=req.body
    const id=req.params.id
    if(req.file)
    {
    const image=req.file.filename
    await Banner.findByIdAndUpdate(id,{title:title,desc:desc,moredetails:mdetails,img:image})
    }
    else
    {
        await Banner.findByIdAndUpdate(id,{title:title,desc:desc,moredetails:mdetails})
    }
    res.redirect('/admin/banner')
}

exports.bannermoredetails=async(req,res)=>{
    const addrecord=await Address.find()
    const bannerRecord=await Banner.findOne()
    console.log(addrecord)
    res.render('bannermdetails.ejs',{bannerRecord,addrecord})
}