import React, { useState, useRef } from 'react';
import { MoreVertical,Trash  } from 'lucide-react';


function RecentCardDashboard({ quiz }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  console.log(quiz);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit"
    });
  };
  return (
    <div className="group relative flex flex-col justify-between h-36 p-4 bg-purple-100/50 rounded-xl shadow hover:scale-[1.01] transition-transform duration-200">
      <div className="hidden group-hover:block  absolute top-4 right-2">
        <button
          onClick={toggleMenu}
          className="text-gray-400 hover:text-gray-600"
        >
          <MoreVertical size={18} />
        </button>

        {isOpen && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-md text-sm z-10"
          >
            <button className="block w-full px-1 py-2 text-left text-red-600 hover:bg-red-50">
                <div className='flex flex-row items-center px-2'>
                    <Trash size={15}/>
                    <p className='ml-1'>Delete</p>
                </div>
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>{formatDate(quiz.createdAt)}</span>
        <div className='mx-4'>
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
              {quiz.difficulty || "N/A"}
            </span>
        </div>
      </div>

      <h3 className="text-base text-purple-700 font-medium line-clamp-2 mt-1">
        {quiz.topic || "Untitled Quiz"}
      </h3>

      <div className="flex justify-between text-sm text-gray-700">
        <span>Score: {quiz.score}/{quiz.totalQuestions}</span>
        <span>Time: {quiz.timeTaken}m</span>
      </div>
    </div>
  );
}

export default RecentCardDashboard;