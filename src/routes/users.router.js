
import { Router } from 'express'
import UsersManager from '../dao/mongoManagers/UsersManager.js'
const router = Router()
const usersManager = new UsersManager()



router.post('/registro', async (req, res) => {
   if (req.body.password === req.body.repeatPassword) {
    const newUser = await usersManager.createUser(req.body)
    if (newUser) {
      res.redirect('/api/views/login')
    } else {
        let mensaje = 'Este usuario ya existe. Vaya a login por favor'
        res.render('errorLogin', {mensaje})
    }
   } else {
    let mensaje = 'No coinciden las contraseñas'  
    res.render('errorRegistro', {mensaje})
   }
   
  })

  
  router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await usersManager.loginUser(req.body)
    if (user) {
        console.log('existe', user)
      req.session.email = email
      req.session.password = password
      res.redirect('/api/products')
    } else {
      res.redirect('/api/views/errorLogin')
    }
  })

router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error)
      res.json({ message: error })
    } else {
      res.json({ message: 'Sesion eliminada con exito' })
    }
  })
})

  export default router
