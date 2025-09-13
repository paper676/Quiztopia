import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UseAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

function QuizSection() {
    // const dummyQuiz = {
    //     _id: "quiz_001",
    //     topic: "JavaScript Basics",
    //     difficulty: "Easy",
    //     questions: [
    //         {
    //             // id: "q1",
    //             question: "Which of the following is a JavaScript data type?",
    //             options: ["String", "Integer", "Character", "Float"],
    //             // answer: "String",
    //         },
    //         {
    //             // id: "q2",
    //             question: "What does `===` check in JavaScript?",
    //             options: [
    //                 "Equality of value only",
    //                 "Equality of type only",
    //                 "Equality of both value and type",
    //                 "None of the above",
    //             ],
    //             // answer: "Equality of both value and type",
    //         },
    //         {
    //             // id: "q3",
    //             question: "Which keyword is used to declare a constant in JavaScript?",
    //             options: ["let", "var", "const", "static"],
    //             // answer: "const",
    //         },
    //         {
    //             // id: "q4",
    //             question: "What will `typeof NaN` return?",
    //             options: ["NaN", "Number", "Undefined", "Object"],
    //             // answer: "Number",
    //         },
    //         {
    //             // id: "q5",
    //             question: "Which company developed JavaScript?",
    //             options: ["Microsoft", "Netscape", "Google", "Sun Microsystems"],
    //             // answer: "Netscape",
    //         },
    //     ],
    // };
    // const [quiz, setQuiz] = useState(dummyQuiz.questions);
    // const [answers, setAnswers] = useState(Array(quiz.length).fill(null));


    const { currentQuiz, navigate, axios, setSubmitedQuiz, submitedQuiz } = UseAppContext();

    const [quiz, setQuiz] = useState([]);
    const [answers, setAnswers] = useState([]);

    const handleSelect = (qIndex, option) => {
        setAnswers((prev) => {
            const updated = [...prev];
            if (updated[qIndex] === option) {
                updated[qIndex] = null;
            } else {
                updated[qIndex] = option;
            }
            return updated;
        });
    };

    const handleSubmit = async () => {
        try {
            const { data } = await axios.post('/api/quiz/submit', { quizId: currentQuiz._id, answers });
            if (data.success) {
                setSubmitedQuiz(data.info);
                // console.log(submitedQuiz);
                // console.log(data.info);
                navigate('/user/create/score');
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Could not generate quiz, try again.");
        }
    }

    useEffect(() => {
        if (currentQuiz && currentQuiz.questions) {
            setQuiz(currentQuiz.questions);
            setAnswers(Array(currentQuiz.questions.length).fill(null));
        }
    }, [currentQuiz]);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = ""; // Shows browser confirmation
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        const handleBeforeRouteChange = (e) => {
            if (!window.confirm("Are you sure you want to leave? Your quiz progress will be lost.")) {
                e.preventDefault();
            }
        };

        // Listen for clicks on dashboard/back buttons (optional)
        const links = document.querySelectorAll('a');
        links.forEach(link => link.addEventListener('click', handleBeforeRouteChange));

        return () => {
            links.forEach(link => link.removeEventListener('click', handleBeforeRouteChange));
        };
    }, []);

    if (!currentQuiz) {
        return (
            <div className="flex items-center justify-center h-[89vh]">
                <p className="text-gray-600"><b>No quiz loaded</b>. Please generate one first.</p>
            </div>
        );
    }
    return (
        <div>
            <div className='w-full no-scrollbar flex-1 h-[89vh] overflow-y-scroll'>
                {/* <TimeBar /> */}
                <div className="p-20 space-y-4 pt-4">
                    {quiz.map((q, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                            <p className="font-medium text-gray-800">{i + 1}. {q.question}</p>
                            <ul className="mt-2 space-y-1">
                                {q.options.map((opt, idx) => (
                                    <li
                                        key={idx}
                                        onClick={() => handleSelect(i, opt)}
                                        className={`p-2 rounded-md cursor-pointer border transition ${answers[i] === opt
                                            ? "bg-indigo-100 text-indigo-700 border-indigo-400"
                                            : "bg-gray-50 text-gray-700 border-gray-200"
                                            }`}
                                    >
                                        {opt}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <Link to="/user/create/score">
                    <div onClick={handleSubmit} className="sticky bottom-0 z-20 bg-white px-6 py-3 flex justify-end shadow-lg">
                        <button className="bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-lg text-white px-6 py-2 font-medium">
                            Finish Quiz
                        </button>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default QuizSection