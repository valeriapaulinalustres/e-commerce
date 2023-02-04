const socketClient = io()

// elementos
const title = document.getElementById('title')
const description = document.getElementById('description')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const newProducts = document.getElementById('newProducts')

formulario.onsubmit = (e) => {
    e.preventDefault()
  
    const newProduct = {
    title: title.value,
      description: description.value,
      price: price.value,
      stock: stock.value,
    }
  
    socketClient.emit('newProduct', newProduct)

    title.value='',
    description.value ='',
    price.value= '',
    stock.value= ''
  //  console.log(newProduct)
  }

  
  socketClient.on('newProductsArray', newProductsArray=>{
      console.log(newProductsArray)
  
      const newProductsRender = newProductsArray.map(elem=>{
          return `<h3>Producto: ${elem.title}</h3>
          <h4>Precio: ${elem.price}</h4>
          <p>${elem.description}</p>
          <h5>Cantidad en stock: ${elem.stock}</h5>
          `
      }).join(' ')
      newProducts.innerHTML = newProductsRender
  })