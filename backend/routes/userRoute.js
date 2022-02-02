const express = require("express")
const path = require("path")
// const img= require
const { createUser, getUsers, updateUser, deleteUser, loginUser, logout, profileUpload } = require("../controllers/userControllers")
const multer = require("multer")
const router = express.Router()

// const uploadPath = path.join(__dirname,"../",'uploads')
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./backend/images")
    },
    filename:function(req,file,cb){
        //let newName = path.extname(file.originalname)
        cb(null, file.originalname)
    }
})
const limits = {
    fields: 10,
    fileSize: 500 * 1024,
    files: 1,
  };
const upload = multer({
    storage:storage,
    limits
})

router.route("/create").post(upload.single("image"),createUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logout)
router.route("/users").get(getUsers)
router.route("/user/:id").put(updateUser).delete(deleteUser)
router.route("/upload").post(upload.single("image"), profileUpload)
// router.route("/upload").post(upload.array("image") , profileUpload)




module.exports = router