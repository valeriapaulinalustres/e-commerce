import {
    createUserService,
    loginUserService
} from '../services/users.services.js'


  export const logoutController = (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        console.log(error)
        res.json({ message: error })
      } else {
        res.redirect('/api/views/login')
      }
    })
  }

  

