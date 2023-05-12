import { Router } from "express";
const router = Router()


router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/registro',(req,res)=>{
    res.render('registro')
})

router.get('/errorRegistro',(req,res)=>{
    res.render('errorRegistro')
})

router.get('/errorLogin',(req,res)=>{
    res.render('errorLogin')
})

router.get('/forgot-password', (req,res)=>{
    res.render('forgotPassword')
})

//---reset password---
router.get('/resetpassword/:user/:token', (req,res) => {
    const user = req.params.user
    const token = req.params.token
    res.render('resetPassword', {user,token})
})

export default router