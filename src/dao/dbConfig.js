import mongoose from 'mongoose'


const URI = 'mongodb+srv://valeriapaulinalustres:Artemisa37@cluster0.knm2ak6.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.connect(URI, (error)=>{
    if (error) {console.log(error)
    } else {
        console.log('Conectado a la base de datos')
    }
})