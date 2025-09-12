const express=require('express');
const { authUser } = require('../middlewares/AuthUser');
const { deleteQuiz, unsaveQuiz, userProgress, retryQuiz } = require('../controllers/QuizManageController');

const QuizManageRouter=express.Router()

QuizManageRouter.delete('/:quizId',authUser,deleteQuiz); //why delete
QuizManageRouter.delete('/saved/:quizId',authUser,unsaveQuiz); //why delete
QuizManageRouter.get('/progress',authUser,userProgress);
QuizManageRouter.get('/retry/:quizId',authUser,retryQuiz);

module.exports=QuizManageRouter;