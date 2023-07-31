const mongoose = require("mongoose")
const { createHmac,randomBytes } = require('crypto');
const {createTokenForUser} = require("../services/auth")

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,

    },
    profileImageUrl:{
        type:String,
        default:"/images/default.avif"
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
},
{timestamps:true}
)


// pehle user apne aap ko save karega usse pehle yeh function call karega
userSchema.pre("save", function(next) {
   const user=this;

//    check if user modify the password
   if(!user.isModified('password')) return;

   const salt = randomBytes(16).toString()
   const hashedPassword = createHmac('sha256', salt)
   .update(user.password)
   .digest("hex")

   this.salt=salt;
   this.password= hashedPassword; 

    next();
  } )




userSchema.static("matchPasswordAndGenerateToken", async function(email,password){
    const user =await this.findOne({email})
    if(!user)  throw new Error(" user not found")

    const salt=user.salt;
    const hashedPassword = user.password;

    const userProvidedPassword = createHmac('sha256', salt)
                                .update(password)
                                .digest("hex")

    if(hashedPassword !== userProvidedPassword) throw new Error(" password or username is incorrect");

    const token = createTokenForUser(user)

    return token;
})
module.exports=mongoose.model("user",userSchema)