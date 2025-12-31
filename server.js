const express=require('express')
const mongoose=require('mongoose')
const session=require('express-session')
const authRouter=require('./routes/authRouteOne')
const feedbackRoute = require('./routes/feedbackRoute')
const path=require('path')
const app=express()

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.use(session({
    secret: "secretkey456",
    resave: false,
    saveUninitialized: false
}))
mongoose.connect('mongodb://127.0.0.1:27017/mvc')
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err))

//set view engine
app.set('view engine','ejs')

//routes
app.use('/',authRouter)
app.use('/', feedbackRoute)


//dashboard route
const authController=require('./controllers/authControllerOne')
app.get('/dashboard',authController.dashboard)

app.listen(3501,()=>{
    console.log('server is running on port 3501')
})