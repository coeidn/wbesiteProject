const router=require('express').Router()
const regc=require('../controllers/regcontrollers') //reg table
const bannerc=require('../controllers/bannercontroller') //banner table
const servicec=require('../controllers/servicecontroller') //service table
const testic=require('../controllers/testicontroller')
const queryc=require('../controllers/querycontroller')
const addc=require('../controllers/addresscontroller') //address table
const upload=require('../helpers/multer')
const nodemailer=require('nodemailer')
const handleloginpage=require('../helpers/handlelogin')




// login pages links
router.get('/',regc.loginpage)
router.post('/',regc.getloginpage)

//admin dashboards link
router.get('/dashboard',handleloginpage,(req,res)=>{
    const username=req.session.username
    res.render('admin/dashboard.ejs',{username})
})

//admin banner-page link
router.get('/banner',handleloginpage,bannerc.bannerSelection)

router.get('/logout',regc.logout)

router.get('/bannerupdate/:id',handleloginpage,bannerc.bannerupdateform)

router.post('/bannerupdate/:id',upload.single('img'),bannerc.bannerupdate)

router.get('/service',handleloginpage,servicec.serviceselection)

router.get('/serviceform',handleloginpage,servicec.serviceform)

router.post('/serviceform',upload.single('img'),servicec.serviceget)

router.get('/servicedelete/:id',handleloginpage,servicec.servicedelete)

router.get('/servicestatusupdate/:id',handleloginpage,servicec.statusupdate)

router.post('/service',servicec.searchbystatus)

router.get('/testinominals',handleloginpage,testic.testinominals)

router.get('/testistatusupdate/:id',handleloginpage,testic.statusupdate)

router.post('/testinominals',testic.testisearch)

router.get('/testidelete/:id',handleloginpage,testic.testidelete)

router.get('/query',handleloginpage,queryc.queryAdminAllRecord)

router.get('/querydelete/:id',handleloginpage,queryc.querydelete)

router.get('/querystatus/:id',queryc.queryform)

router.post('/querystatus/:id',upload.single('attachment'),queryc.emailsend)

router.get('/address',addc.addressshow)

router.get('/addressupdate/:id',addc.addressform)

router.post('/addressupdate/:id',addc.addressupdate)

router.get('/forgetpassword',regc.forgetpassword)

module.exports=router