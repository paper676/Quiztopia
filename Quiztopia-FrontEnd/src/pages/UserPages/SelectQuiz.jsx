import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { UseAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function SelectQuiz() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [numQuestions, setNumQuestions] = useState(5);
  const [extraInstructions, setExtraInstructions] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);

  const { setCurrentQuiz, navigate, axios } = UseAppContext();

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) return toast.error("Please enter a topic");
    setIsGenerating(true);
    try {
      const { data } = await axios.post('/api/quiz/generate', { topic, difficulty, numQuestions, extraInstructions });
      if (data.success) {
        setCurrentQuiz(data.quiz);
        navigate('/user/create/quiz');
      }
    } catch (error) {
      console.error(error);
      toast.error("Could not generate quiz, try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // useEffect(()=>{
  //   handleGenerateQuiz();
  // },[])

  return (
    <div className='w-full no-scrollbar flex-1 h-[89vh] overflow-y-scroll bg-gradient-to-br from-indigo-50 via-white to-purple-50'>
      <div className="pt-6">
        <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white rounded-md shadow-sm border border-gray-200">

          <div className="flex items-center gap-3">
            <Sparkles size={28} className="text-indigo-800 animate-pulse" />
            <h1 className="text-3xl font-bold text-indigo-900">Generate AI Quiz</h1>
          </div>
          <p className="ml-2 text-gray-600 font-medium text-sm">Let AI create a great quiz for you - just give it a few instructions!</p>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter topic (e.g., JavaScript Basics)"
              className="w-full border border-gray-300 p-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <select
              className="w-full border border-gray-300 p-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
            <input
              type="number"
              placeholder="Number of Questions"
              className="w-full border border-gray-300 p-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
            />
            <textarea
              placeholder="Extra instructions (optional)"
              className="w-full border border-gray-300 p-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows="3"
              value={extraInstructions}
              onChange={(e) => setExtraInstructions(e.target.value)}
            ></textarea>

            <button
              onClick={handleGenerateQuiz}
              disabled={isGenerating}
              className={`w-full py-3 text-lg font-semibold bg-indigo-500 text-white rounded-lg shadow-lg flex items-center justify-center gap-2 transition-transform duration-300 ${isGenerating ? "opacity-50 cursor-not-allowed" : "hover:scale-101 hover:bg-indigo-600"}`}
            >
              <Sparkles size={20} />
              {isGenerating ? "Generating..." : "Generate with AI"}
            </button>
            {isGenerating && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 rounded-2xl">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 border-4 border-t-indigo-500 border-gray-300 rounded-full animate-spin"></div>
                  <p className="text-white text-sm font-medium">AI is crafting your quiz, please wait...</p>
                </div>
              </div>
            )}

          </div>

          {/* {isGenerating && (
            <div className="flex flex-col items-center space-y-3 pt-6">
              <div className="w-12 h-12 border-t-4 border-indigo-400 border-solid rounded-full animate-spin"></div>
              <p className="text-gray-600 animate-pulse">AI is thinking...</p>
            </div>
          )} */}

          {/* {quiz && (
            <div className="space-y-4 pt-4">
              {quiz.map((q, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="font-medium text-gray-800">{i + 1}. {q.question}</p>
                  <ul className="mt-2 space-y-1">
                    {q.options.map((opt, idx) => (
                      <li
                        key={idx}
                        className={`p-2 rounded-md ${opt === q.answer ? "bg-green-100 text-green-700" : "bg-gray-50 text-gray-700"
                          }`}
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )} */}
        </div>
      </div>
    </div >
  )
}

export default SelectQuiz