const express=require('express');
const { authUser } = require('../middlewares/AuthUser');
const { updateProfile, deleteUser } = require('../controllers/UserManageController');

const UserManageRouter=express.Router();

UserManageRouter.post('/updateProfile',authUser,updateProfile);
UserManageRouter.get('/deleteUser',authUser,deleteUser)

module.exports=UserManageRouter;
