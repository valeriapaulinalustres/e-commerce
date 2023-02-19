const socketClient = io()

// elementos
const title = document.getElementById('title')
const description = document.getElementById('description')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const newProducts = document.getElementById('newProducts')
const formulario = document.getElementById('formulario')

// formulario.onsubmit = (e) => {
//     e.preventDefault()
  
//     const newProduct = {
//     title: title.value,
//       description: description.value,
//       price: price.value,
//       stock: stock.value,
//     }
  
//     socketClient.emit('newProduct', newProduct)

//     title.value=''
//     description.value =''
//     price.value= ''
//     stock.value= ''

//   }

//   const productsArray = []
//   socketClient.on('newProductsArray', newProductsArray=>{
//       console.log(newProductsArray)

//   productsArray.push(newProductsArray)

//       const newProductsRender = newProductsArray.map((elem, index)=>{
//           return `<div class="newProductContainer">
//           <h3>Producto: ${elem.title}</h3>
//           <h4>Precio: ${elem.price}</h4>
//           <p>${elem.description}</p>
//           <h5>Cantidad en stock: ${elem.stock}</h5>
//           </div>
          
//           `
          
//       }).join(' ')
//       newProducts.innerHTML = newProductsRender
     
//   })

  //**********CHAT**************** */

  const messageInput = document.getElementById('message')
  const formularioChat = document.getElementById('formularioChat')

//   formularioChat.addEventListener('submit', submit)

// function submit (e) {
//     e.preventDefault()
//     console.log(e.target.value)
// }

  formularioChat.onsubmit = (e) => {
    e.preventDefault()
  console.log(messageInput.value)
    const newMessage = {
    message: messageInput.value,
    }
  console.log(newMessage)
    socketClient.emit('newMessage', newMessage)

    messageInput.value=''

  }

  const messagesArray = []
  socketClient.on('newMessagesArray', newMessagesArray=>{
      console.log(newMessagesArray)

  messagesArray.push(newMessagesArray)
  }
  ) 
  
