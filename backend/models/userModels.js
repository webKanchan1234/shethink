
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        //minlength:[4,"Minimum 4 character"]
    },
    email:{
        type:String,
        required:[true,"Please Enter your name"],
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:[8,"Mininmum 8 character length required"],
        select:false
    },
    mobile:{
        type:Number,
        require:true
    },
    role:{
        type:String,
        required:true,
        default:"user"
    },
    image:{
        type:String,
    }

})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.getJsonToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}
//compare password after converting from hash-----------------
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}
// userSchema.methods.comparePassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
//   };

module.exports = mongoose.model("User",userSchema)