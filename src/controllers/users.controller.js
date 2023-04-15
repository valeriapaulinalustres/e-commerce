import {
    createUserService,
    loginUserService,
    getUsersDataService
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

  export const getUsersDataController = async (req,res) => {
    try {
      const usersMail = req.session.mail
      const userData = await getUsersDataService(usersMail)
      res.json({mensaje: userData})
    } catch (error) {
      console.log('error')
    }
  }

  

