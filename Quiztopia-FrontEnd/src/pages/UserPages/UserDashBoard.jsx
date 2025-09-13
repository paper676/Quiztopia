import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecentCardDashboard from '../../components/RecentCardDashboard'
import StactCard from './StactCard'

import { Plus, Save, ChartBar } from 'lucide-react'

import { UseAppContext } from '../../context/AppContext'


function UserDashBoard() {
  const { user,previousQuizzes,userProgress } = UseAppContext();
  const [recentQuizzes, setRecentQuizzes] = useState([]);

  useEffect(() => {
    if (previousQuizzes?.length > 0) {
      setRecentQuizzes(previousQuizzes.slice(0, 3));
    } else {
      setRecentQuizzes([]);
    }
  }, [previousQuizzes]);

  return (
    <div className='p-10 w-full no-scrollbar flex-1 h-[89vh] overflow-y-scroll'>
      <h1 className='text-5xl font-medium'>Welcome Back,<span className='font-light'>{user?.name || "User"}</span></h1>
      <div className='mt-5'>
        <p className='text-zinc-700 text-[15px] font-[25px]'>Recent Activity :</p>
        <hr className='my-3 text-zinc-200 rounded-md' />
        <div className='my-5'>
          {recentQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-4">
              {recentQuizzes.map(q => (
                <RecentCardDashboard key={q._id} quiz={q} />
              ))}
            </div>
          ):(
            <div className='flex justify-center text-sm h-[4rem]'>
              <p className="text-gray-500 italic">No recent quizzes yet</p>
            </div>
          )
          }
        </div>
        <h2 className='text-zinc-700 text-[15px] font-[25px] mt-10'>Quick Activites:</h2>
        <div className='mt-5 mb-10 sm:h-[30vh] md:h-[20vh] lg:h-[10vh] grid grid-cols-1 lg:grid-cols-5 gap-10'>
          <Link to="/user/create">
            <button className="group w-50 cursor-pointer border border-gray-200 h-15 text-gray-500 hover:text-indigo-800 hover:bg-indigo-100 erase-in transition rounded-md flex flex-row justify-center items-center" type="button">
              <Plus size={20} className="transition-transform duration-300 group-hover:rotate-90" />
              <p className='ml-2 font-medium'>Create new Quiz</p>
            </button>
          </Link>
          <Link to="/user/saved-quizes">
            <button className="group w-50 cursor-pointer border border-gray-200 h-15 text-gray-500 hover:text-indigo-800 hover:bg-indigo-100 erase-in transition rounded-md flex flex-row justify-center items-center" type="button">
              <Save size={20} className="transition-transform duration-300 group-hover:-rotate-12" />
              <p className='ml-2 font-medium'>Saved Quizes</p>
            </button>
          </Link>
        </div>
        <div className="p-6 bg-gray-50 rounded-xl shadow my-10">
          <p className='text-zinc-700 text-[20px] font-medium flex flex-row items-center'><ChartBar size={25} className='mr-2' /> Progress</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
            <StactCard label="Total Quizzes Taken" value={`${userProgress.totalQuizes}`} />
            <StactCard label="Average Score" value={`${userProgress.avgScore}`} />
            <StactCard label="Total Time Spent" value={`${Math.ceil(userProgress.totalTimeSpent / 60)}min`} />
          </div>
          {/* <ChartA/> */}
        </div>
      </div>
    </div>
  )
}

export default UserDashBoard