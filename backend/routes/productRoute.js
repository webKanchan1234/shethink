const express = require("express")
const { createProduct, getAllProducts } = require("../controllers/productControllers")
const { isAuthenticated, authorizeRoles,} = require("../middleware/auth")

const router = express.Router()

router.route("/createProduct").post(createProduct)
router.route("/products").get(isAuthenticated, authorizeRoles("admin"), getAllProducts)





module.exports = router