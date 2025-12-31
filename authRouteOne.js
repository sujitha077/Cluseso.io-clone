
const express=require('express')
const router=express.Router()
const authController=require('../controllers/authControllerOne')
router.get('/register',(req,res)=>res.render('registerOne'))
router.get('/login',(req,res)=>res.render('loginOne'))
router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/login')
});
router.post('/register',authController.registerUser)
router.post('/login',authController.loginUser)

module.exports=router