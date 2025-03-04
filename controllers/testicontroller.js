const Testi=require('../models/testi')
const Address=require('../models/address')







exports.testiform=(req,res)=>{
    const addrecord=Address.find()

    res.render('testiform.ejs',{message:'',addrecord})
}
exports.testiadd=(req,res)=>{
    const{quotes,cname}=req.body
    if(req.file)
    {
    const filename=req.file.filename
    var record=new Testi({img:filename,quotes:quotes,name:cname})
    }
    else
    {
        var record=new Testi({quotes:quotes,name:cname})
    }
    record.save()
    const addrecord=Address.find()
    res.render('testiform.ejs',{message:'Successfully Rewiew Has Been Given',addrecord})
}

exports.testinominals=async(req,res)=>{
    const username=req.session.username
    const record=await Testi.find().sort({postedDate:-1}) 
    const tquotes=await Testi.estimatedDocumentCount()
    const unpublished={status:'Unpublished'}
    const untesti=await Testi.countDocuments(unpublished)
    const published={status:'Published'}
    const ptesti=await Testi.countDocuments(published)  
    res.render('admin/testinominals.ejs',{username,record,tquotes,untesti,ptesti})
}

exports.statusupdate=async(req,res)=>{
    const id=req.params.id
    const record=await Testi.findById(id)
    let newstatus=null
    if(record.status=='Unpublished')
    {
        newstatus='Published'
    }else
    {
        newstatus='Unpublished'
    }
    await Testi.findByIdAndUpdate(id,{status:newstatus})
    res.redirect('/admin/testinominals')
}

exports.testisearch=async(req,res)=>{
    const username=req.session.username
    const searchstatus=req.body.searchinput
    if(searchstatus!=='All')
    {
       var record=await Testi.find({status:searchstatus}).sort({postedDate:-1}) 
    }else
    {
        var record=await Testi.find({status:{$in:['Unpublished','Published']}}).sort({postedDate:-1}) 
    }

    const tquotes=await Testi.estimatedDocumentCount()
    const unpublished={status:'Unpublished'}
    const untesti=await Testi.countDocuments(unpublished)
    const published={status:'Published'}
    const ptesti=await Testi.countDocuments(published)  
    res.render('admin/testinominals.ejs',{username,record,tquotes,untesti,ptesti})
}

exports.testidelete=async(req,res)=>{
    const id=req.params.id
    await Testi.findByIdAndDelete(id)
    res.redirect('/admin/testinominals')
}