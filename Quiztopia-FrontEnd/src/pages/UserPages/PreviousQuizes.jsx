import React, { useEffect, useState } from 'react'
import { Star, Trash } from "lucide-react";
import { UseAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

export default function PreviousQuizes() {
  const { previousQuizzes, axios, savedQuizzes } = UseAppContext();

  const [quizzes, setQuizzes] = useState([]);

  const handleDelete = async (quizId) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    try {
      const { data } = await axios.delete(`/api/quizManage/${quizId}`);
      if (data.success) {
        setQuizzes(prev => prev.filter(q => q._id !== quizId));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("An Error Ocuured While Removing");
    }
  }

  const handleSave = async (quizId) => {
    try {
      const { data } = await axios.post('/api/quiz/save', { quizId });
      if (data.success) {
        setQuizzes((prev) =>
          prev.map((q) =>
            q._id === quizId ? { ...q, isSaved: !q.isSaved } : q
          )
        );
        toast.success(data.message || "Quiz Saved");
      } else {
        toast.error(data.message || "Failed to save quiz.");
      }
    } catch (error) {
      toast.error("An Error Ocuured While Saving");
    }
  }
  useEffect(() => {
    if (previousQuizzes?.length > 0) {
      setQuizzes(previousQuizzes);
    } else {
      setQuizzes([]);
    }
  }, [previousQuizzes, savedQuizzes])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit"
    });
  };

  return (
    <div>
      <div className="lg:p-10 md:p-5 sm:p-2 w-full no-scrollbar flex-1 h-[89vh] overflow-y-scroll bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-[8px] shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">Previous Quizzes</h2>
          {quizzes.length > 0 ? (
            <div>
              {quizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 bg-white rounded-md shadow hover:shadow-md transition md:mt-3 sm:mt-5"
                >
                  <div className='sm:text-sm'>
                    <p className="text-lg font-semibold text-gray-800">{quiz.topic}</p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 truncate">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${quiz.difficulty === "Easy"
                          ? "bg-green-100 text-green-600"
                          : quiz.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                          }`}
                      >
                        {quiz.difficulty}
                      </span>
                      <span>{formatDate(quiz.createdAt)}</span>
                      <span>{Math.ceil(quiz.timeTaken / 60)} min</span>
                    </div>
                  </div>

                  <div className="flex items-center lg:gap-4 md:gap-3 sm:gap-2 sm:text-sm">
                    <span className="text-indigo-600 font-semibold">
                      {quiz.score} / {quiz.totalQuestions}
                    </span>
                    <button
                      onClick={() => handleSave(quiz._id)}
                      className={`p-2 rounded-full transition ${quiz.isSaved
                          ? "text-yellow-500 hover:text-yellow-600"
                          : "text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50"
                        }`}
                      title={quiz.isSaved ? "Saved" : "Save"}
                    >
                      <Star size={18} fill={quiz.isSaved ? "currentColor" : "none"} />
                    </button>
                    <button
                      onClick={() => handleDelete(quiz._id)}
                      className="p-2 rounded-full hover:bg-red-50 text-red-500 hover:text-red-700 transition"
                      title="Delete"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-[6rem]">
              <p className="text-gray-500 italic">No recent quizzes yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
