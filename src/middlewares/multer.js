import multer from 'multer'
import { __dirname } from '../utils.js'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname === 'product') {
        cb(null, __dirname + '/public/documents/product')
      }
      if (file.fieldname === 'profile') {
        cb(null, __dirname + '/public/documents/profile')
      }
      if (file.fieldname === 'document') {
        cb(null, __dirname + '/public/documents/document')
      }
      
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    },
  })
  
  export const upload = multer({ storage: storage })
