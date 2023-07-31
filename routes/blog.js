const express = require('express')
const router = express.Router()
const Blog= require("../models/blog")
const Comment= require("../models/comments")

const multer  = require('multer')
// const {  } = require("../controller/blog")
const path = require("path")
const { log } = require('console')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`
      cb(null, filename )
    }
  })
  
  const upload = multer({ storage: storage })


router.get("/add-new",(req,res)=>{
    return res.render("AddBlog",{
        user:req.user
    })
})

router.post("/",upload.single('coverImg'),async (req,res)=>{
  const {title,body} = req.body;
   const blog = await Blog.create({
    title,
    body,
    createdBy:req.user._id,
    coverImageUrl:`/uploads/${req.file.filename}`
   })
   console.log(blog)
    return res.redirect(`/blog/${blog._id}`)
})

router.get("/:id",async (req,res)=>{
   const blog = await Blog.findById(req.params.id).populate("createdBy")
   const comments = await Comment.find({blogId:req.params.id}).populate("createdBy")
  console.log(comments);
   return res.render("Blog",{
    user:req.user,
    blog, 
    comments,
   })
})


router.post("/comment/:blogId",async (req,res)=>{

  console.log(req.params.blogId);
await Comment.create({
    content:req.body.content,
    blogId:req.params.blogId,
    createdBy:req.user._id
  })
  return res.redirect(`/blog/${req.params.blogId}`)
})


module.exports=router;