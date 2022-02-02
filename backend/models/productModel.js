const mongoose=require("mongoose")
const pagination = require("mongoose-aggregate-paginate-v2")


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true
    }
})

productSchema.plugin(pagination)

module.exports = mongoose.model("Product",productSchema)