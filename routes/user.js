const express = require('express')
const router = express.Router()
const User= require("../models/user")

const { userSignup ,userLogin,logoutUser } = require("../controller/user")


router.get("/login",(req,res)=>{
    return res.render("login")
})

router.get("/signup",(req,res)=>{
    return res.render("signup")
})


router.post("/signup",userSignup)
router.post("/login",userLogin)

router.get("/logout",logoutUser)

module.exports=router;