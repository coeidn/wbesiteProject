const Service=require('../models/service') //table
const Address=require('../models/address')




exports.serviceselection=async(req,res)=>{
    try{
    const username=req.session.username
    const record=await Service.find().sort({createdate:-1})
    const tservice=await Service.estimatedDocumentCount()
    const unpublished={status:'Unpublished'}
    const unservice=await Service.countDocuments(unpublished)
    const published={status:'Published'}
    const pservice=await Service.countDocuments(published)
    res.render('admin/service.ejs',{username,record,tservice,pservice,unservice})
    }catch(error)
    {
        console.log(error.message)
    }
}

exports.serviceform=(req,res)=>{
    try{
    const username=req.session.username
    res.render('admin/serviceform.ejs',{username})
    }catch(error)
    {
        console.log(error.message)
    }
}

exports.serviceget=(req,res)=>{
    const image=req.file.filename
    try{
    const{title,desc,mdetails}=req.body
    const currentDate=new Date()
    const record=new Service ({title:title,desc:desc,mdetails:mdetails,img:image,createdate:currentDate})
    record.save()
    res.redirect('/admin/service')
    }
    catch(error)
    {
        console.log(error.message)
        res.redirect('/admin/service')
    }
}

exports.servicedelete=async(req,res)=>{
    const id=req.params.id
    await Service.findByIdAndDelete(id)
    res.redirect('/admin/service')
}

exports.statusupdate=async(req,res)=>{
    const id=req.params.id
    const record=await Service.findById(id)
    let newstatus=null;
    if(record.status=='Unpublished')
    {
        newstatus='Published'
    }
    else
    {
        newstatus='Unpublished'
    }

    await Service.findByIdAndUpdate(id,{status:newstatus})
    res.redirect('/admin/service')
}

exports.searchbystatus=async(req,res)=>{
    const{searchinput}=req.body
    const username=req.session.username
    if(searchinput!=='All')
    {
    var record=await Service.find({status:searchinput}).sort({createdate:-1})
    }else
    {
     record=await Service.find({status:{$in:['Unpublished','Published']}}).sort({createdate:-1})
    }
    const tservice=await Service.estimatedDocumentCount()
    const unpublished={status:'Unpublished'}
    const unservice=await Service.countDocuments(unpublished)
    const published={status:'Published'}
    const pservice=await Service.countDocuments(published)
    res.render('admin/service.ejs',{username,record,tservice,pservice,unservice})
}

exports.servicemoredetails=async(req,res)=>{
    const id=req.params.id
    const addrecord=await Address.find()
    const record=await Service.findById(id)
    res.render('servicemdetails.ejs',{record,addrecord})
}