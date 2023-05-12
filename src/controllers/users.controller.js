import {
    createUserService,
    loginUserService,
    getUsersDataService,
    forgotPasswordService
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

  export const forgotPasswordController = async (req,res) =>{
    try {
      const mail = req.body.email
      console.log('mail', mail)
      if (req.body.email == "") {
        res.status(400).send({message:'Se requiere un mail'})
      } else {
        const user = await forgotPasswordService(mail)
        res.send({mensaje: 'email enviado con éxito', user})
      }    
    } catch (error) {
      console.log('error')
    }
  }

  export const createNewPasswordController = async (req, res) =>{
    try {
      const newPassword = req.body.password
      console.log(newPassword)
    } catch (error) {
      console.log('error')
    }
  }

  

