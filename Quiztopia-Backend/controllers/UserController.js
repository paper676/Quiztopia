const UserModel = require("../models/UserModel");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
//User Register : api/user/register
module.exports.register=async(req,res)=>{
    try {
        console.log("JWT_SECRET is:", process.env.JWT_SECRET);
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({success:false,message:"Enter all The required fields"});
        }
        const IsExist=await UserModel.findOne({email})
        if(IsExist){
            return res.status(400).json({success:false,message:"User Alrey Exist!"})
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'});
        res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge:6*60*60*1000
        })
        return res.status(200).json({success:true,user:{email:user.email,name:user.name}})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}
//User login : api/user/login
module.exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        // console.log({email,password});
        if(!email || !password){
            return res.json({success:false,message:"Enter all The required fields"})
        }
        const user = await UserModel.findOne({ email }).select('+password');
        if(!user){
            return res.json({success:false,message:"Invalid Username or Password"})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid Username or Password"})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'},)
        res.cookie('token',token,{
            httpOnly: true,
            secure: true,
            sameSite: 'none' ,
            maxAge:6*60*60*1000
        })

        return res.json({success:true,user:{email:user.email,name:user.name}})
    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

//Login User :/api/user/is-auth
module.exports.isAuth = async (req, res) => {
    try {
        return res.json({ success: true,user: req.user });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

//Logout User :/api/user/logout
module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('token',{
            httpOnly : true,
            secure: true,
            sameSite: 'none',
        })
        return res.json({success:true,message:"User LoggedOut!"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}