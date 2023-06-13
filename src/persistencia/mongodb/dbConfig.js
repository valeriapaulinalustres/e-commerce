import mongoose from 'mongoose'
import config from '../../config.js'

//const URI = 'mongodb+srv://valeriapaulinalustres:Artemisa37@cluster0.knm2ak6.mongodb.net/ecommerce?retryWrites=true&w=majority'

const URI = config.MONGOURL

//esto ya está deprecado: 
// mongoose.connect(URI, (error)=>{
//     if (error) {console.log(error)
//     } else {
//         console.log('Conectado a la base de datos')
//     }
// })
try{
   await mongoose.connect(URI)
    console.log('Conectado a la base de datos')
} catch (error) {
console.log('error')
}