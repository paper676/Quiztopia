const QuizModel = require("../models/QuizModel");
const UserModel = require("../models/UserModel");


//Delete a quiz from history : api/quizManage/:quizId
module.exports.deleteQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const userId = req.user._id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // const Idx = user.previousQuizzes.findIndex(id => id.toString() === quizId);
        // if (Idx == -1) {
        //     return res.status(404).json({ success: false, message: "Quiz not found." });
        // }
        //changed By Gpt,know it,why used
        const existed = user.previousQuizzes.some(id => id.toString() === quizId); // CHANGED: indexOf -> some + toString()
        if (!existed) {
            return res.status(404).json({ success: false, message: "Quiz not found in history." });
        }
        const deletedQuiz = await QuizModel.findOneAndDelete({ _id: quizId, userId });
        if (!deletedQuiz) {
            return res.status(404).json({ success: false, message: "Quiz not found." });
        }
        user.previousQuizzes.pull(quizId); //know It
        user.savedQuizzes.pull(quizId);
        await user.save();
        return res.status(200).json({ success: true, message: "Quiz Removed." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
//unsave a quiz : api/quizManage/saved/:quizId
module.exports.unsaveQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const userId = req.user._id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        // const Idx = user.savedQuizzes.findIndex(id => id.toString() === quizId);
        // if (Idx == -1) {
        //     return res.status(404).json({ success: false, message: "Quiz not found." });
        // }
        //changed By Gpt,know it,why used
        const existed = user.savedQuizzes.some(id => id.toString() === quizId); // CHANGED: indexOf -> some + toString()
        if (!existed) {
            return res.status(404).json({ success: false, message: "Quiz not found in saved list." });
        }
        user.savedQuizzes.pull(quizId); //know It
        await user.save();
        return res.status(200).json({ success: true, message: "Quiz Unsaved." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
//Progress of user : api/quizManage/progress
module.exports.userProgress = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await UserModel.findById(userId).populate({
            path: "previousQuizzes",
            select: "score timeTaken",
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        let totalQuizes = 0;
        let totalTimeSpent = 0;
        let totalScore = 0;
        let avgScore = 0;
        let maxScore = 0;

        totalQuizes = user.previousQuizzes.length;

        for (let i = 0; i < totalQuizes; i++) {
            const timeTaken_for_i = user.previousQuizzes[i].timeTaken || 0;
            const score_for_i = user.previousQuizzes[i].score || 0;
            totalTimeSpent += timeTaken_for_i;
            totalScore += score_for_i;
            maxScore = Math.max(maxScore, score_for_i);
        }

        avgScore = totalQuizes > 0 ? Number((totalScore / totalQuizes).toFixed(2)) : 0;
        return res.status(200).json({ success: true, progress: { totalQuizes, totalTimeSpent, totalScore, avgScore, maxScore } });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

//Retry previous Quiz : api/quizManage/retry/:quizId;
module.exports.retryQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const userId = req.user._id;

        const quiz = await QuizModel.findById(quizId);
        if (!quiz || quiz.userId.toString() !== userId.toString()) {
            return res.status(404).json({ success: false, message: "Quiz not found." });
        }
        // Send back quiz but hide answers
        const quizToRetry = {
            _id: quiz._id,
            topic: quiz.topic,
            difficulty: quiz.difficulty,
            questions: quiz.questions.map(q => ({
                question: q.question,
                options: q.options,
            })),
            createdAt: quiz.createdAt,
        };

        return res.status(200).json({ success: true, quiz: quizToRetry });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};