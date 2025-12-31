
const User = require('../models/userModelOne')
const bcrypt=require('bcryptjs')

exports.registerUser = async(req,res)=>{
    const {username,email,password}=req.body;
//check user exists
const userExist=await User.findOne({ email })
if(userExist)
    return res.send('user already exist')

//hash password
const hashedPassword=await bcrypt.hash(password,10)

const newUser=new User({
    username,
    email,
    password:hashedPassword
})


await newUser.save()
res.send('Registration Successfull')
}
exports.loginUser= async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({ email })
    if(!user)
        return res.send('user does not exist')
     
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch)
        return res.send('Incorrect Password')


//storing username in session
req.session.username = user.username;
res.redirect('/dashboard')
}
exports.dashboard=(req,res)=>{
    if(!req.session.username){
        return res.redirect('/login')
    }
  res.render('dashboardOne',{username:req.session.username})
}