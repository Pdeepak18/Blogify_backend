const JWT = require("jsonwebtoken")
require("dotenv").config()


exports.createTokenForUser = (user) =>{
     const payload = {
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        profileImageURL:user.profileImageURL,
        role:user.role,
     }
     const token = JWT.sign(payload,process.env.SECRET,{
        expiresIn:"2h"
     })

     return token;
}

exports.validateToken = (token) =>{
    const payload = JWT.verify(token,process.env.SECRET);
    return payload;
}
