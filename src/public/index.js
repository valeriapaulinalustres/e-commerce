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
const alias = document.getElementById('alias')


//   formularioChat.addEventListener('submit', submit)

// function submit (e) {
//     e.preventDefault()
//     console.log(e.target.value)
// }

formularioChat.onsubmit = (e) => {
  e.preventDefault()
  console.log(messageInput.value)
  const chat = {
    user: alias.value,
    message: messageInput.value,

  }
  console.log(chat)
  socketClient.emit('update-chat', chat)

  messageInput.value = ''

}
// render-chat
socketClient.on('chat', manejarEventoChat);
async function manejarEventoChat(chat) {
    console.log(chat)

    const recursoRemoto = await fetch('/hbs/chat.hbs')
    const textoPlantilla = await recursoRemoto.text()
    const functionTemplate = Handlebars.compile(textoPlantilla)

    const html = functionTemplate({ chat })
    document.getElementById('chat').innerHTML = html
}


/*

// update-chat
const formChat = document.getElementById('form-chat')
formChat.addEventListener('submit', e => {
    e.preventDefault()

    const hora = new Date()

    const chat = {
        mail: document.getElementById('chat-mail').value,
        msg: document.getElementById('chat-msg').value,
        hora: '[' + hora.toLocaleString() + ']'
    }
    
    socket.emit('update-chat', chat);
    document.getElementById('chat-msg').value = ''
})

// render-chat
socket.on('chat', manejarEventoChat);
async function manejarEventoChat(chat) {
    console.log(chat)

    const recursoRemoto = await fetch('hbs/chat.hbs')
    const textoPlantilla = await recursoRemoto.text()
    const functionTemplate = Handlebars.compile(textoPlantilla)

    const html = functionTemplate({ chat })
    document.getElementById('chat').innerHTML = html
}






*/
function addProductToCart ( ){
  console.log('clic')
}

