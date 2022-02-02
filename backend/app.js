const express = require("express")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const app = express()
const errorMIddlware = require("./middleware/error")
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));

const user = require("./routes/userRoute")
const product = require("./routes/productRoute")



app.use(express.static(__dirname + './images'));
app.use('/uploads', express.static("./backend/images"));
app.use("/api/v1/",user)
app.use("/api/v1/",product)
// app.use("loads", express.static("images"))

app.use(errorMIddlware)

// crud\backend\images\1643779157561.jpg

module.exports = app