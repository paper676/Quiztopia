import React from 'react'
import { Route, Routes } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import UserDashBoard from './pages/UserPages/UserDashBoard'
import CreateQuiz from './pages/UserPages/CreateQuiz'
import FixedStructure from './pages/UserPages/FixedStructure'
import PreviousQuizes from './pages/UserPages/PreviousQuizes'
import SavedQuizes from './pages/UserPages/SavedQuizes'
import QuizSection from './pages/UserPages/quizSection'
import SelectQuiz from './pages/UserPages/SelectQuiz'

import { Toaster } from 'react-hot-toast';
import { UseAppContext } from './context/AppContext';
import QuizResult from './pages/UserPages/QuizCompletion'
import ProfilePage from './components/ProfilePage'
import HelpPage from './components/HelpPage'

function App() {
  const { isUser } = UseAppContext();
  return (
    <div>
      {isUser && <Toaster />}
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/profile' element={isUser?<ProfilePage/>:<Login/>}></Route>
        <Route path='/user' element={isUser?<FixedStructure/>:<Login/>}>
          <Route index element={isUser ?<UserDashBoard/>:null}></Route>
          <Route path='create' element={<CreateQuiz/>}>
            <Route index element={<SelectQuiz/>}></Route>
            <Route path='quiz' element={<QuizSection/>}></Route>
            <Route path='score' element={<QuizResult/>}></Route>
          </Route>
          <Route path='previous' element={<PreviousQuizes/>}></Route>
          <Route path='saved-quizes' element={<SavedQuizes/>}></Route>
        </Route>
        <Route path='/help' element={<HelpPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App