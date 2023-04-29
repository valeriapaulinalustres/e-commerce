
export const ErrorsName = {
    PRODUCT_DATA_INCOMPLETE: 'Error products',
    USER_DATA_INCOMPLETE: 'Error users',
    CART_DATA_INCOMPLETE: 'Error carts',

    PRODUCT_DATA_NOT_FOUND_IN_DATABASE: 'Error products',
    USER_DATA_NOT_FOUND_IN_DATABASE: 'Error users',
    CART_DATA_NOT_FOUND_IN_DATABASE: 'Error carts'
  }
  
  export const ErrorsMessage = {
    PRODUCT_DATA_INCOMPLETE: 'Request failed. Valid properties required',
    USER_DATA_INCOMPLETE: 'Request failed. Valid properties required',
    CART_DATA_INCOMPLETE: 'Request failed. Valid properties required',

    PRODUCT_DATA_NOT_FOUND_IN_DATABASE: 'Request failed. Not found in database',
    USER_DATA_NOT_FOUND_IN_DATABASE: 'Request failed. Not found in database',
    CART_DATA_NOT_FOUND_IN_DATABASE: 'Request failed. Not found in database',

  }
  
  export const ErrorsCause = {
    PRODUCT_DATA_INCOMPLETE: 'Properties missing',
    USER_DATA_INCOMPLETE: 'Properties missing',
    CART_DATA_INCOMPLETE: 'Properties missing',

    PRODUCT_DATA_NOT_FOUND_IN_DATABASE: 'Not found in database.',
    USER_DATA_NOT_FOUND_IN_DATABASE: 'Request failed. Not found in database',
    CART_DATA_NOT_FOUND_IN_DATABASE:'Request failed. Not found in database',
  }

  //en rutas:
 


// app.post('/products', (req, res) => {
//   const { name, price } = req.body
//   if (!name || !price) {
//     CustomError.createCustomError({
//       name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
//       cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
//       message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
//     })
//   } else {
