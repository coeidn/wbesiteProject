const Address=require('../models/address')





exports.addressshow=async(req,res)=>{
    const record=await Address.findOne()
    res.render('admin/address.ejs',{username:req.session.username,record})
}

exports.addressform=async(req,res)=>{
    const id=req.params.id; 
    const record=await Address.findById(id)
    res.render('admin/addressupdateform.ejs',{username:req.session.username,record})
}

exports.addressupdate=async(req,res)=>{
    const id=req.params.id;
    const{add,tele,whatsp,mob,email,in1}=req.body

    await Address.findByIdAndUpdate(id,{add:add,tel:tele,whatsup:whatsp,mobile:mob,email:email,in:in1})
    res.redirect('/admin/address')
}