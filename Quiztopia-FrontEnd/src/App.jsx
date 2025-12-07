import React from 'react'
import { Route, Routes } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import UserDashBoard from './pages/UserPages/UserDashBoard'
import CreateQuiz from './pages/UserPages/CreateQuiz'
import FixedStructure from './pages/UserPages/FixedStructure'
import PreviousQuizes from './pages/UserPages/PreviousQuizes'
import SavedQuizes from './pages/UserPages/SavedQuizes'
import QuizSection from './pages/UserPages/QuizSection'
import SelectQuiz from './pages/UserPages/SelectQuiz'
import UploadFile from './pages/UserPages/UploadFile'

import { Toaster } from 'react-hot-toast';
import { UseAppContext } from './context/AppContext';
import QuizResult from './pages/UserPages/QuizCompletion'
import ProfilePage from './components/ProfilePage'
import HelpPage from './components/HelpPage'

function ProtectedRoute({ children }) {
  const { isUser, loading } = UseAppContext();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 rounded-xl bg-white shadow-lg flex items-center space-x-3">
          <div className="w-6 h-6 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          {/* <p className="text-gray-700 font-medium">Checking authentication...</p> */}
        </div>
      </div>
    );
  }

  return isUser ? children : <Login />;
}

function App() {
  const { isUser } = UseAppContext();
  return (
    <div>
      {/* {isUser && <Toaster />} */}
      <Toaster />
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/profile' element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}></Route>
        <Route path='/user' element={<ProtectedRoute><FixedStructure/></ProtectedRoute>}>
          <Route index element={<UserDashBoard/>}></Route>
          <Route path='create' element={<CreateQuiz/>}>
            <Route index element={<SelectQuiz/>}></Route>
            <Route path='quiz' element={<QuizSection/>}></Route>
            <Route path='score' element={<QuizResult/>}></Route>
          </Route>
          <Route path='upload' element={<UploadFile/>}></Route>
          <Route path='previous' element={<PreviousQuizes/>}></Route>
          <Route path='saved-quizes' element={<SavedQuizes/>}></Route>
        </Route>
        <Route path='/help' element={<HelpPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App