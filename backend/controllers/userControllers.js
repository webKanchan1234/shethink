const User = require("../models/userModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/sendToken");
const sharp = require("sharp")
const path = require("path")




//create user------------------
exports.createUser = catchAsyncErrors(async(req,res,next) =>{

    // let compressImg = path.join(__dirname,"../","uploads",new Date().getTime() + ".jpeg")
    // sharp(req.file.path).resize(640,480).jpeg({
    //     quality:80,
    //     chromaSubsampling:'4:4:4'
    // }).toFile(compressImg)
    const {name, email, password, mobile} = req.body

    
    const user = await User.create({
        name,
        email,
        password,
        mobile,
        image:req.file.path
        
    });

    //const token = user.getJsonToken()

    // res.status(200).json({
    //     success:true,
    //     user,
    //     token
    // })
    sendToken(user,200,res)
})
//login user------------------------------------------
exports.loginUser = catchAsyncErrors(async(req,res,next) =>{
    const {email, password} = req.body

    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password"))
    }
    const user = await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Please enter valid email and password"))
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Please enter valid email and password"))
    }
    // const token = user.getJsonToken()
    // res.status(200).json({
    //     success:true,
    //     user,
    //     token
    // })
    sendToken(user,200,res)
})
//logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  });
///get all users----------------------------
exports.getUsers = catchAsyncErrors(async(req,res) =>{
    const users = await User.find()
    res.status(200).json({
        success:true,
        users
    })
})
//------------update users-----------
exports.updateUser = catchAsyncErrors(async(req,res,next) =>{
    let user = await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler("User not found",201))
    }
    user = await User.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    //await user.save()
    res.status(200).json({
        suuccess:true,
        msg:"User updated successfully"
    })
})
///delete user---------------------------
exports.deleteUser = catchAsyncErrors(async(req,res) =>{
    const user = await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler("User not found",201))
    }
    user.remove()
    res.status(200).json({
        success:true,
        msg:"User deleted successfully"
    })
})
////profile uploaded------------------------------------
exports.profileUpload = catchAsyncErrors(async(req,res,next) =>{
    console.log(req.files)
    res.json({
        msg:"image uploaded"
    })
})