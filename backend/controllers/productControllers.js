const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const Product = require("../models/productModel")


//create product----------------------------
exports.createProduct = catchAsyncErrors(async(req,res) =>{
    const product = await Product.create(req.body);

    res.status(200).json({
        success:true,
        product
    })
})

//get all products-------------------------
exports.getAllProducts = catchAsyncErrors(async(req,res,next) =>{
    let {page, perPage} = req.query
    let {keyword} = req.query
    
    const options = {
        page: parseInt(page,5) || 1,
        limit:parseInt(perPage,10) || 10,
        //keyword:keyword
    }
    const products = await Product.aggregatePaginate({},options)  //{} takes
    //OR------------------------------
    // if(!page){
    //     page=1
    // }
    // if(!perPage){
    //     perPage=5
    // }
    // const limit = parseInt(perPage)
    // const skip = (page-1)*perPage
    // // const products = await Product.find({},{},{limit:limit,skip:skip}) //------------OR
    // const products = await Product.find().limit(limit).skip(skip)
    res.status(200).json({
        success:true,
        products
    })
})