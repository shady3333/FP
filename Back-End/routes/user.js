const express=require("express");
const {requiresignIn}=require("../controllers/auth");
const {userById,allUsers,getUser,updateUser,deleteUser}=require("../controllers/user");



const router=express.Router();

router.get("/users", allUsers);
router.get("/user/:userId",requiresignIn,getUser);
router.put("/user/:userId",requiresignIn,updateUser);
router.delete("/user/:userId",requiresignIn,deleteUser);
router.param("userId", userById);

module.exports=router;
