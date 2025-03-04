const express=require('express') //function format
const app=express()  //module format
require('dotenv').config()
app.use(express.urlencoded({extended:false}))
const userRouter=require('./routers/userrouter')
const adminRouter=require('./routers/adminrouter')
const session=require('express-session')
const mongoose=require('mongoose')
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)


app.use(session({
    secret:process.env.SECRET_KEY,
    saveUninitialized:false,
    resave:false
}))
app.use('/admin',adminRouter)
app.use(userRouter)
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(process.env.PORT,()=>{console.log(`server is running on ${process.env.PORT} port`)})