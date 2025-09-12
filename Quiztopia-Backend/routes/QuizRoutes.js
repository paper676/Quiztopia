const express=require('express');
const { generate, saveQuiz, submitQuiz, previousQuizes, savedQuizes } = require('../controllers/QuizController');
const { authUser } = require('../middlewares/AuthUser');

const QuizRouter=express.Router()

QuizRouter.post('/generate',authUser,generate);
QuizRouter.post('/save',authUser,saveQuiz);
QuizRouter.post('/submit',authUser,submitQuiz);
QuizRouter.get('/previous',authUser,previousQuizes);
QuizRouter.get('/saved',authUser,savedQuizes);

module.exports=QuizRouter;