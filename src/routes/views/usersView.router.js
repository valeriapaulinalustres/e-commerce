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


export default router