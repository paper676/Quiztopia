import React, { createContext, useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import axios from 'axios'

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    const navigate = useNavigate();

    axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL; // adjust backend port
    axios.defaults.withCredentials = true;

    const [user, setUser] = useState(null);
    const [isUser, setIsUser] = useState(false);
    const [previousQuizzes, setPreviousQuizzes] = useState([]);
    const [savedQuizzes, setSavedQuizzes] = useState([]);
    const [userProgress, setUserProgress] = useState(null);
    const [currentQuiz,setCurrentQuiz] = useState(null);
    const [submitedQuiz,setSubmitedQuiz] = useState(null);

    //fetch user status
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/is-auth');
            if (data.success) {
                setIsUser(true);
                setUser(data.user);
            } else {
                setIsUser(false);
            }
        } catch (error) {
            setUser(null);
            setIsUser(false);
        }
    }
    //fetch Previous Quizes
    const fetchPreviousQuizes = async () => {
        try {
            const { data } = await axios.get('/api/quiz/previous');
            if (data.success) {
                setPreviousQuizzes(data.quizzes);
            }
        } catch (err) {
            toast.error("Could not fetch Recent quizzes");
        }
    }
    //fetch Saved Quizes
    const fetchSavedQuizes = async () => {
        try {
            const { data } = await axios.get('/api/quiz/saved');
            if (data.success) {
                setSavedQuizzes(data.quizzes);
            }
        } catch (err) {
            toast.error("Could not fetch Saved quizzes");
        }
    }
    //fettch userProgress
    const fetchUserProgrss=async () => {
        try {
            const { data } = await axios.get('/api/quizManage/progress');
            if (data.success) {
                setUserProgress(data.progress);
            }
        } catch (error) {
            toast.error("Could not fetch User Progress");
        }
    }

    useEffect(() => {
        fetchUser();
        fetchPreviousQuizes();
        fetchSavedQuizes();
        fetchUserProgrss();
    }, []);

    const value = {
        navigate,
        axios,
        user,
        setUser,
        isUser,
        setIsUser,
        previousQuizzes,
        userProgress,
        savedQuizzes,
        setCurrentQuiz,
        currentQuiz,
        submitedQuiz,
        setSubmitedQuiz,
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const UseAppContext = () => {
    return useContext(AppContext);
}

export { AppContextProvider };