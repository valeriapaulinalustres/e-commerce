
import { Router } from 'express'
import UsersManager from '../dao/mongoManagers/UsersManager.js'
const router = Router()
const usersManager = new UsersManager()



router.post('/registro', async (req, res) => {
    const newUser = await usersManager.createUser(req.body)
    if (newUser) {
      res.redirect('/api/views/login')
    } else {
      res.redirect('/api/views/errorRegistro')
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
  export default router
