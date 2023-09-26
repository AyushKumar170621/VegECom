const express = require("express");
const { getAllProducts, createProduct,updateProduct, deleteProduct, getProductDetials, createProductReview,getAdminProducts, getProductReviews, deleteReview } = require("../controllers/productController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/products").get(isAuthenticatedUser, authorizedRoles("admin"), getAdminProducts);
router.route("/admin/products/new").post(isAuthenticatedUser,authorizedRoles("admin"), createProduct);
router.route("/admin/products/:id").put(isAuthenticatedUser,authorizedRoles("admin"),updateProduct).delete(isAuthenticatedUser,authorizedRoles("admin"),deleteProduct)
router.route("/product/:id").get(getProductDetials);
router.route("/review").put(isAuthenticatedUser,createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview);
module.exports = router
// 64b4f19f5d0876df84bf46c0