import React, { useEffect, useState } from 'react'
import { UseAppContext } from '../context/AppContext';
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
function Login() {
    const { setUser, isUser, setIsUser, navigate, axios,user } = UseAppContext()
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            console.log({ name, email, password });
            const { data } = await axios.post(`/api/user/${state}`, { name, email, password });
            if (data.success) {
                setIsUser(true);
                setUser(data.user);
                navigate('/user');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        if (isUser) {
            navigate('/user');
        }
    }, [isUser]);
    return !user  && (
        <div>
            <div className='w-full pt-10 pl-10'>
                <Link to='/'>
                    <button className='hover:cursor-pointer p-0 m-0 text-zinc-500 hover:text-zinc-800'>
                        <div className="flex flex-row items-center">
                            <ArrowLeft size={18}/>
                            <p className='ml-1 text-sm text-black-600'>Home</p>
                        </div>
                    </button>
                </Link>
            </div>
            <div className='w-full lg:p-25 md:p-10 sm:p-5 flex justify-center align-center'>
                <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-90 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
                    <p className="text-2xl font-medium m-auto">
                        <span className="text-indigo-500"></span> {state === "login" ? "Login" : "Sign Up"}
                    </p>
                    {state === "register" && (
                        <div className="w-full">
                            <p>Name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
                        </div>
                    )}
                    <div className="w-full ">
                        <p>Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="email" required />
                    </div>
                    <div className="w-full ">
                        <p>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required />
                    </div>
                    {state === "register" ? (
                        <p>
                            Already have account? <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">click here</span>
                        </p>
                    ) : (
                        <p>
                            Create an account? <span onClick={() => setState("register")} className="text-indigo-500 cursor-pointer">click here</span>
                        </p>
                    )}
                    <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                        {state === "register" ? "Create Account" : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login