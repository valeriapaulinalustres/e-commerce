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
      const user = req.user
      console.log('mail de usuario',user.email)
      //const userData = await getUsersDataService(user)
      res.json({usersMail: user.email, userFullname: user.full_name})
    } catch (error) {
      console.log('error')
    }
  }

  

