const QuizModel = require("../models/QuizModel");
const UserModel = require("../models/UserModel");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')

//Update name and password : /api/userManage/update
module.exports.updateProfile=async (req,res)=>{
    try {
        const { name,password}=req.body;
        const userId = req.user._id;
        const updates={};
        if(name){
            updates.name=name;
        }
        if(password){
            updates.password = await bcrypt.hash(password, 10);
        }
        const updatedUser = await UserModel.findByIdAndUpdate(userId, updates, { new: true }).select("name email");
        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ success: false, message: error.message });
    }
}

//Delete User : /api/userManage/delete
module.exports.deleteUser=async (req,res)=>{
    try {
        const userId=req.user._id;

        await QuizModel.deleteMany({ userId });

        await UserModel.findByIdAndDelete(userId);

        res.clearCookie("token");
        
        res.status(200).json({ success: true,message:"Account Deleted Permanently" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}