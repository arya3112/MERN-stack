// router/auth-router.js
const express = require("express");
const router = express.Router();
const { home,register, login } = require("../controllers/auth-controller"); 
 const validate=require("../midlewares/validate-middleware");
const signupSchema = require("../validators/auth-validators");
//const { register } = require("../controllers/auth-controller");  // Correct impor
//POST METHOD IS USED TO ADD
router.route("/").get(home);  // This sets up the GET request for the root path "/"
router.route("/register").post(validate(signupSchema),register);
router.route("/login").post(login);
module.exports = router;  // Exporting the router

