const QuizModel = require("../models/QuizModel");
// const OpenAI = require("openai");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const UserModel = require("../models/UserModel");

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//Genrate Quizz : api/quiz/generate
module.exports.generate = async (req, res) => {
    try {
        const { topic, difficulty = "Easy", numQuestions = 5, extraInstructions = "" } = req.body;
        if (!topic || !difficulty) {
            return res.status(400).json({ success: false, message: "Topic and difficulty are required" });
        }
        const prompt = `
            Generate ${numQuestions} multiple-choice quiz questions on "${topic}" 
            with ${difficulty} difficulty. ${extraInstructions || ""}
            Each question must have exactly 4 options and one correct answer.
            Return in JSON format like this:
            [
              {
                "question": "string",
                "options": ["A", "B", "C", "D"],
                "answer": "correct option here"
              }
            ]
        `;
        // const completion = await openai.chat.completions.create({
        //     model: "gpt-4o-mini", // lightweight + cost effective
        //     messages: [{ role: "user", content: prompt }],
        //     temperature: 0.7,
        // });
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        // console.log(result.response.text());
        let questions = [];
        try {
            let text = result.response.text().trim();
            text = text.replace(/```json|```/gi, ""); // clean if Gemini wraps JSON
            questions = JSON.parse(text);

            if (!Array.isArray(questions) || questions.length === 0) {
                throw new Error("Gemini did not return any questions");
            }
        } catch (e) {
            throw new Error("Failed to parse Gemini response as JSON");
        }
        // try {
        //   questions = JSON.parse(completion.choices[0].message.content);
        // } catch (err) {
        //   return res.status(500).json({
        //     success: false,
        //     message: "Failed to parse AI response",
        //   });
        // }

        const quiz = await QuizModel.create({
            userId: req.user._id,
            topic,
            difficulty,
            questions,
            startTime: new Date(),
        })
        req.user.previousQuizzes.push(quiz._id.toString());
        await req.user.save();
        const quizToSend = {
            _id: quiz._id,
            topic: quiz.topic,
            difficulty: quiz.difficulty,
            questions: quiz.questions.map((q) => ({
                question: q.question,
                options: q.options,
            })),
            createdAt: quiz.createdAt,
        };

        return res.json({ success: true, quiz: quizToSend })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

//Save Quizes to Saved quizes: api/quiz/save

module.exports.saveQuiz = async (req, res) => {
    try {
        const { quizId } = req.body;
        const userid = req.user._id;
        const user = await UserModel.findById(userid);
        // console.log({quizId,user});
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        const quizExists = await QuizModel.findById(quizId);
        if (!quizExists) {
            return res.status(404).json({ success: false, message: "Quiz not found." });
        }
        if (quizExists.userId.toString() !== userid.toString()) {
            return res.status(403).json({ success: false, message: "You cannot save someone else's quiz." });
        }

        const isSaved = user.savedQuizzes.includes(quizId.toString());

        if (!isSaved) {
            user.savedQuizzes.push(quizId.toString());
            await user.save();
            return res.status(200).json({ success: true, message: "Quiz saved successfully!", isSaved: true });
        } else {
            user.savedQuizzes = user.savedQuizzes.filter(id => id.toString() !== quizId.toString());
            await user.save();
            return res.status(200).json({ success: true, message: "Quiz unsaved successfully!", isSaved: false });
        }
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
}
//Submit quiz : api/quiz/submit
module.exports.submitQuiz = async (req, res) => {
    try {
        const { quizId, answers } = req.body;
        const quiz = await QuizModel.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ success: false, message: "Quiz not found." });
        }

        if (quiz.submitted) {
            res.status(500).json({ success: false, message: "Submitted Alredy" });
        }

        let cnt = 0;
        let correctAnswers = [];
        const totalNoQuestions = quiz.questions.length;
        for (let i = 0; i < totalNoQuestions; i++) {
            const actualAnswer = quiz.questions[i].answer
            const userAnswer = answers[i] || null;
            if (actualAnswer === userAnswer) {
                cnt++;
                correctAnswers.push({ questionIndex: i, correct: true, userAnswer, actualAnswer })
            } else {
                correctAnswers.push({ questionIndex: i, correct: false, userAnswer, actualAnswer })
            }
        }
        quiz.timeTaken = Math.floor((Date.now() - quiz.startTime) / 1000);
        quiz.score = cnt;
        quiz.submitted = true;
        await quiz.save();

        return res.status(200).json({ success: true, info: { score: quiz.score, totalNoQuestions, time: quiz.timeTaken, questions: quiz.questions, correctAnswers } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

//Get Histoy of Quizes Generated : api/quiz/previous
module.exports.previousQuizes = async (req, res) => {
    try {
        const userId = req.user._id

        const user = await UserModel.findById(userId).populate({
            path: 'previousQuizzes',
            select: 'topic difficulty score timeTaken createdAt questions',
            options: { sort: { createdAt: -1 } }
        });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const quizzes = user.previousQuizzes.map((q) => ({
            _id: q._id,
            topic: q.topic,
            difficulty: q.difficulty,
            score: q.score,
            timeTaken: q.timeTaken,
            createdAt: q.createdAt,
            totalQuestions: q.questions.length,
            isSaved: user.savedQuizzes.includes(q._id.toString()),
        }));
        return res.status(200).json({ success: true, quizzes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

//Get saved Quizes : api/quiz/saved
module.exports.savedQuizes = async (req, res) => {
    try {
        const userId = req.user._id

        const user = await UserModel.findById(userId).populate({
            path: 'savedQuizzes',
            select: 'topic difficulty questions createdAt',
            options: { sort: { createdAt: -1 } }
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const quizzes = user.savedQuizzes.map(quiz => ({
            _id: quiz._id,
            topic: quiz.topic,
            difficulty: quiz.difficulty,
            createdAt: quiz.createdAt,
            questions: quiz.questions.map(q => ({
                question: q.question,
                options: q.options,
            })),
            isSaved: true
        }));
        res.status(200).json({ success: true, quizzes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}