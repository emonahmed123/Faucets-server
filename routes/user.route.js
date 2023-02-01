const express =require("express");
const router= express.Router();
const userController = require("../controllers/user.controller")
const verifyToken =require("../middleware/verifyToken")
const authorization=require("../middleware/authorization")


router.post("/signup",userController.signup)

router.post("/login", userController.login);

router.get("/allm",verifyToken, authorization('admin'),userController.alluser);



module.exports = router;