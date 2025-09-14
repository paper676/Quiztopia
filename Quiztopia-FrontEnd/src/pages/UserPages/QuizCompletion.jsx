import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, RotateCcw, Home } from "lucide-react";
import { UseAppContext } from "../../context/AppContext";

function QuizResult() {
  const { submitedQuiz } = UseAppContext() || {};

  if (!submitedQuiz) return <p>Loading results...</p>;
  const score = submitedQuiz.score;
  const total = submitedQuiz.totalNoQuestions;
  const time = submitedQuiz.time;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="w-full no-scrollbar flex-1 h-[89vh] overflow-y-scroll">
      <div className="flex flex-col items-center justify-center min-h-[89vh] p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 ">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-700">Quiz Completed</h2>
          <p className="text-gray-600 mt-2 text-lg">
            You scored <span className="font-semibold text-indigo-700">{score}</span> out of
            <span className="font-semibold text-indigo-700"> {total}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Accuracy: {percentage}%
          </p>
        </div>


        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg shadow-sm">
            <CheckCircle className="text-green-500 mb-1" size={28} />
            <span className="text-lg font-semibold text-green-700">
              {score}
            </span>
            <p className="text-sm text-gray-600">Correct</p>
          </div>

          <div className="flex flex-col items-center p-4 bg-red-50 rounded-lg shadow-sm">
            <XCircle className="text-red-500 mb-1" size={28} />
            <span className="text-lg font-semibold text-red-700">
              {total - score}
            </span>
            <p className="text-sm text-gray-600">Wrong</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Link to='/user/create'>
            <button
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition"
            >
              <RotateCcw size={18} /><p>New quiz</p>
            </button>
          </Link>
          <Link to='/user'>
            <button
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-lg shadow transition"
            >
              <Home size={18} /> Dashboard
            </button>
          </Link>
        </div>

        <div className="lg:p-20 md:15 sm:p-5 space-y-4 py-4">
          {submitedQuiz.questions.map((q, i) => {
            const correctness = submitedQuiz.correctAnswers.find(c => c.questionIndex === i);

            return (
              <div key={i} className="relative bg-white w-full p-4 pt-10 rounded-xl border border-gray-200 shadow-sm">
                <p className={`absolute top-2 right-2 px-2 py-1 text-sm font-medium rounded-md mb-2
                  ${submitedQuiz.correctAnswers[i].correct
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"}`}>
                  {submitedQuiz.correctAnswers[i].correct ? "Correct" : "Wrong"}
                </p>

                <p className="font-medium text-gray-800">{i + 1}. {q.question}</p>
                <ul className="mt-2 space-y-1">
                  {q.options.map((opt, idx) => {
                    let className = "p-2 rounded-md border transition ";

                    if (opt === correctness.actualAnswer) {
                      className += "bg-green-100 text-green-700 border-green-300";
                    } else if (opt === correctness.userAnswer && !correctness.correct) {
                      className += "bg-red-100 text-red-700 border-red-300";
                    } else {
                      className += "bg-gray-50 text-gray-700 border-gray-200";
                    }

                    return (
                      <li key={idx} className={className}>
                        {opt}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default QuizResult;