import React, { useEffect, useState } from 'react'
import { Play, Star, Trash } from "lucide-react";
import { UseAppContext } from '../../context/AppContext';

function SavedQuizes() {
  const { savedQuizzes, axios,previousQuizzes} = UseAppContext();

  const [quizzes, setQuizzes] = useState([]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit"
    });
  };
  const handleSave = async (quizId) => {
    try {
      const { data } = await axios.post('/api/quiz/save', { quizId });
      if (data.success) {
        setQuizzes(prev => prev.filter(q => q._id !== quizId));
        toast.success(data.message || "Quiz Saved");
      } else {
        toast.error(data.message || "Failed to save quiz.");
      }
    } catch (error) {
      toast.error("An Error Ocuured While Saving");
    }
  }

  useEffect(() => {
    if (savedQuizzes?.length > 0) {
      setQuizzes(savedQuizzes);
    } else {
      setQuizzes([]);
    }
  }, [previousQuizzes, savedQuizzes])

  return (
    <div className="lg:p-10 md:p-5 sm:p-2 w-full no-scrollbar flex-1 h-[89vh] overflow-y-scroll bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-[8px] shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Saved Quizzes</h2>
        {quizzes.length > 0 ? (
          <div>
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="flex justify-between items-center p-4 mb-3 bg-white rounded-md shadow hover:shadow-md transition"
                >
                  <div className='sm:text-sm'>
                    <p className="text-lg font-semibold text-gray-800">{quiz.topic}</p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
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
                      <span>{quiz.questions?.length || 0} Qs</span>
                    </div>
                  </div>

                  <div className="flex items-center md:gap-4 sm:gap-3">
                    {/* <button
                      title="Play Quiz"
                      className="p-2 rounded-full hover:bg-green-50 text-green-500 hover:text-green-700 transition"
                    >
                      <Play size={18} />
                    </button> */}
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
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p>No saved quizzes yet.</p>
                <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Create a Quiz
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className='flex justify-center text-sm h-[4rem]'>
            <p className="text-gray-500 italic">No recent quizzes yet</p>
          </div>
        )
        }
      </div>
    </div>
  );
}

export default SavedQuizes