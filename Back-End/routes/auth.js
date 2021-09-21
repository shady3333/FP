const express=require("express");
const {signUp,signIn,signOut}=require("../controllers/auth");
const {userById}=require("../controllers/user");
const {usersignUpValidator}=require("../validator");
//const validator=require("../validator");


const router=express.Router();

router.post("/signUp", usersignUpValidator, signUp);
router.post("/signIn", signIn);
router.get("/signOut", signOut);



router.param("userId", userById);

module.exports=router;
