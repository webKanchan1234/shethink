
const mongoose = require("mongoose")

const dbConnection = () => {
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then((data)=>{
        console.log("Mongodb connected")
    })
    // .catch((err)=>{
    //     console.log(err)
    // })
}

module.exports = dbConnection