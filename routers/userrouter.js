const router=require('express').Router()
const regc=require('../controllers/regcontrollers') //reg table controller
const bannerc=require('../controllers/bannercontroller') //banner table controller
const servicec=require('../controllers/servicecontroller') //service table
const testic=require('../controllers/testicontroller')
const queryc=require('../controllers/querycontroller')
const addc=require('../controllers/addresscontroller') //address table
const Banner=require('../models/banner') //banner direct
const Testi=require('../models/testi')
const Address=require('../models/address')
const banner = require('../models/banner')
const Service=require('../models/service')
const upload=require('../helpers/multer')
const handleloginpage=require('../helpers/handlelogin')


router.get('/',async(req,res)=>{
    const bannerRecord=await Banner.findOne()
    const servicerecord=await Service.find({status:'Published'}).sort({createdate:-1})
    const testirecord=await Testi.find({status:'Published'}).sort({postedDate:-1})
    const addrecord=await Address.findOne()
    res.render('home.ejs',{bannerRecord,servicerecord,testirecord,addrecord})
})

router.get('/bannermoredetails',bannerc.bannermoredetails)
router.get('/servicemoredetails/:id',servicec.servicemoredetails)
router.get('/testiadd',testic.testiform)
router.post('/testiadd',upload.single('img'),testic.testiadd)
router.post('/',queryc.queryadd)
router.get("/forgetpassword",regc.forgetpassword);




module.exports=router