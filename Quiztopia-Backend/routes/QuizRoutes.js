const express=require('express');
const { generate, saveQuiz, submitQuiz, previousQuizes, savedQuizes, generateFromFile } = require('../controllers/QuizController');
const { authUser } = require('../middlewares/AuthUser');
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const QuizRouter=express.Router()

QuizRouter.post('/generate',authUser,generate);
QuizRouter.post('/save',authUser,saveQuiz);
QuizRouter.post('/submit',authUser,submitQuiz);
QuizRouter.get('/previous',authUser,previousQuizes);
QuizRouter.get('/saved',authUser,savedQuizes);
QuizRouter.post("/from-file", authUser, upload.single("file"),generateFromFile);

module.exports=QuizRouter;