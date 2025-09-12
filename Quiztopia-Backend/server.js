require("dotenv").config();
const cors=require('cors');

const port = process.env.PORT || 3000;

const AllowedOrigins=['http://localhost:5173','https://quick-commerce-project-frontend.vercel.app']

const express=require('express');
const app=express();

const cookieParser=require('cookie-parser');

const connectToDb=require('./configs/db');

const UserRouter = require('./routes/UserRoutes');
const QuizRouter = require('./routes/QuizRoutes');
const QuizManageRouter = require("./routes/QuizManage");
const UserManageRouter = require("./routes/UserManage");

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:AllowedOrigins,credentials:true}));
app.use(cookieParser());

connectToDb()

app.get('/',(req,res)=>res.send("hello"));
app.use('/api/user',UserRouter);
app.use('/api/quiz',QuizRouter);
app.use('/api/userManage',UserManageRouter);
app.use('/api/quizManage',QuizManageRouter);

app.listen(port,()=>{
    console.log(`App Running at http://localhost:${port}`);
})

