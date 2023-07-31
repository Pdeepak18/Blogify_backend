const { validateToken } = require("../services/auth");

function checkForAuthentication(token) {
return (req,res,next) =>{
    const tokenCookie =  req.cookies.token
    if(!tokenCookie) {
       return next();
    }
    try{
        const userPayload = validateToken(tokenCookie)
        req.user=userPayload;
    }catch(error){
              
    }
    return   next();

}}

module.exports={
    checkForAuthentication,
}