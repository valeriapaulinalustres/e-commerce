
import { Router } from 'express'
import UsersManager from '../persistencia/DAO/mongoManagers/UsersManager.js'
const router = Router()
const usersManager = new UsersManager()
import passport from 'passport'
import {getUsersDataController} from '../controllers/users.controller.js'


//-------Registro sin passport-----
// router.post('/registro', async (req, res) => {
//    if (req.body.password === req.body.repeatPassword) {
//     const newUser = await usersManager.createUser(req.body)
//     if (newUser) {
//       res.redirect('/api/views/login')
//     } else {
//         let mensaje = 'Este usuario ya existe. Vaya a login por favor'
//         res.render('errorLogin', {mensaje})
//     }
//    } else {
//     let mensaje = 'No coinciden las contraseñas'  
//     res.render('errorRegistro', {mensaje})
//    }
   
//   })

//--------registro con passport---------
router.post(
  '/registro',
  passport.authenticate('registro', {
    failureRedirect: '/api/views/errorRegistro',
    successRedirect: '/api/views/login',
    passReqToCallback: true,
  })
)

  //-------- login sin passport ----------
  // router.post('/login', async (req, res) => {
  //   const { email, password } = req.body
  //   const user = await usersManager.loginUser(req.body)
  //   if (user) {
  //       req.session.name = user[0].first_name
  //     req.session.email = email
  //     req.session.password = password
  //       // if(email === 'adminCoder@mail.com' && password === '12345'){
  //   //   req.session.isAdmin = true
  //   // } else {
  //   //   req.session.isAdmin = false
  //   // }
  //     res.redirect('/api/products')
  //   } else {
  //       let mensaje = 'Usuario o contraseña inválidos'
  //     res.render('errorLogin',{mensaje})
  //   }
  // })

  //---- login con passport------
  router.post(
    '/login',
    passport.authenticate('login', {
      failureRedirect: '/api/views/errorLogin',
     // successRedirect: '/api/products',
      passReqToCallback: true,
    })
  )
  


router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error)
      res.json({ message: error })
    } else {
      res.redirect('/api/views/login')
    }
  })
})

//------registro con Github

router.get(
  '/registroGithub',
  passport.authenticate('github', { scope: ['user:email'] })
)


router.get('/github', passport.authenticate('github'),(req,res)=>{
  req.session.email = req.user.email
  res.redirect('/api/products')
})

//--- obtener datos del usuario ---
router.get('/current', getUsersDataController)

  export default router
