const Query=require('../models/query')
const nodemailer=require('nodemailer')



exports.queryadd=(req,res)=>{
    const{email,query}=req.body
    const record=new Query({email:email,query:query})
    record.save()
    res.render('message.ejs')
}

exports.queryAdminAllRecord=async(req,res)=>{
    const username=req.session.username
    const record=await Query.find().sort({status:-1})
    res.render('admin/query.ejs',{username,record})
}

exports.querydelete=async(req,res)=>{
    const id=req.params.id
    await Query.findByIdAndDelete(id)
    res.redirect('/admin/query')
}

exports.queryform=async(req,res)=>{
    console.log(req.params.id)
    const record=await Query.findById(req.params.id)
    res.render('admin/emailform.ejs',{username:req.session.username,record})
}

exports.emailsend=async(req,res)=>{
  const attachmentPath=req.file.path
    const{emailto,emailfrom,subject,body}=req.body
    const id=req.params.id

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // `true` for port 465, `false` for all other ports
        auth: {
          user: "myprojecttest7788@gmail.com",
          pass: "lyms drtx nblw ccws",
        },
      });
      console.log("connected to Gmail SMTP server")

      const info = await transporter.sendMail({
        from: emailfrom, // sender address
        to: emailto, // list of receivers
        subject: subject, // Subject line
        text: body, // plain text body
        attachments:[{
          path:attachmentPath
        }]
      });
      console.log("email sent") 

    await Query.findByIdAndUpdate(id,{status:'Replied'})
    res.redirect('/admin/query')
}