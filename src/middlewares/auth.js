

export const verificarUsuarioAdmin = (req,res,next)=>{
   // if(req.headers.isadmin === 'true'){
    if(req.user?.role === 'admin'){
        next()
    } else {
        res.json({message:'No estas autorizado para realizar esta operacion'}).status(401)
    }
}

export const verificarUsuarioClient = (req,res,next)=>{
    // if(req.headers.isadmin === 'true'){
     if(req.user?.role === 'user'){
         next()
     } else {
         res.json({message:'No estas autorizado para realizar esta operacion'}).status(401)
     }
 }
