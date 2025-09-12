const UserModel = require("../models/UserModel");
const jwt=require('jsonwebtoken')

module.exports.authUser=async (req,res,next)=>{
    const token =req.cookies?.token;
    if(!token){
        return res.status(401).json({ success: false,message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.id);
        
        if(!user){
            return res.status(401).json({ success: false,message: 'User not found' });
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ success: false,message: error.message });
    }
}