const path =require("path")
require("dotenv").config()
const express = require("express")
const server=express();
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const Blog= require("./models/blog")

const cookieParser = require("cookie-parser");
const {checkForAuthentication} = require("./middleware/auth")
const dbConnect = require("./config/database")
dbConnect();

// middleware
server.use(express.json())
server.use(express.urlencoded({
    extended:true
}))
server.use(cookieParser());
server.use(checkForAuthentication("token"))
server.use(express.static(path.resolve("./public")));

server.set("view engine","ejs");
server.set("views",path.resolve("./views"))


server.get("/", async (req,res)=>{
    const allBlogs = await Blog.find({})
    res.render("Home",{
        user:req.user,
        blogs:allBlogs
    })
})

server.use("/user",userRoute)
server.use("/blog",blogRoute)


server.listen(process.env.PORT,(err)=>{
    if(err) console.log(err);
    console.log(`Server Staerted at port ${process.env.PORT}`);
})