const User = require("../models/user");
const {createTokenForUser} = require("../services/auth")



exports.userSignup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!(fullName && email && password)) {
      return res.status(401).json({
        success: false,
        message: " All input is required ",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: " User Already registered ",
      });
    }
    const newuser = await User.create({
      fullName,
      email,
      password,
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User Cannot be registered , Try Again Later",
    });
  }
};

exports.userLogin = async (req, res) => {
    try {
      const {  email, password } = req.body;

      if (!(email && password)) {
        return res.status(401).json({
          success: false,
          message: " All input is required ",
        });
      }
   
      const token =await  User.matchPasswordAndGenerateToken(email,password)
     console.log(token);
      return res.cookie("token",token).redirect("/");
    } catch (error) {
      console.log(error);
      return res.render("login",{
        error:"Incorrect Email or Password"
        
      })
    }
  };



exports.logoutUser = (req,res)=>{
  try{
    res.clearCookie("token").redirect("/")
  }catch(error){
    console.log(error);
      return res.render("Home",{
        error:"Something Went Wrong"
      })
  }

}