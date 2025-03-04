const Reg=require('../models/reg') //model


exports.loginpage=(req,res)=>
{
    res.render('admin/login.ejs',{message:""})
}

exports.getloginpage=async(req,res)=>
{
    const{us,pass}=req.body
    const record=await Reg.findOne({username:us})
    if(record!==null)
    {  
        if(record.password==pass)
        {
            req.session.isAuth=true
            req.session.username=us
            req.session.userid=record.id
            res.redirect('/admin/dashboard')
        }
        else
        {
            res.render('admin/login.ejs',{message:"Wrong Credentials"})
        }
    }
    else
    {
        res.render('admin/login.ejs',{message:"Wrong Credentials"})
    }
}

exports.logout=(req,res)=>{
    req.session.destroy()
    res.redirect('/admin/')
}

exports.forgetpassword=(req,res)=>
{
    res.render('forgetpassword.ejs')
}