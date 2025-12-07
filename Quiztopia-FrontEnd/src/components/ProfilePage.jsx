import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Trash2, LogOut,ArrowLeft  } from "lucide-react";
import { UseAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

function ProfilePage() {
  const { user, setUser, axios, previousQuizzes, savedQuizzes, navigate,setIsUser} = UseAppContext();

  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   setName(user?.name || "");
  // }, [user]);

  const logout = async () => {
    try {
      const { data } = await axios.get('/api/user/logout');
      if (data.success) {
        setUser(null);
        setIsUser(false);
        navigate('/');
        toast.success(data.message);
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      toast.success(error.message);
    }
  }

  const handleProfileUpdate = async () => {
    try {
      const { data } = await axios.put("/api/userManage/updateProfile", { name, password });
      if (data.success) {
        setUser(data.user);
        setPassword("");
        toast.success("Profile Updated");
      }
    } catch (err) {
      toast.error("Update failed.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure? This will delete your account permanently.")) return;
    try {
      const { data } = await axios.delete("/api/userManage/delete");
      if (data.success) {
        toast.success("Account deleted successfully.");
        navigate("/");
      }
    } catch (err) {
      toast.error("Could not delete account.");
    }
  };

  return (
    <div className="w-full min-h-screen p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-[8px] shadow-sm space-y-6">
        <div className="flex flex-row items-center">
          <Link to='/user' className="hover:scale-105 p-1 rounded-full transition hover:bg-zinc-100"><ArrowLeft size={18}/></Link>
          <p className='ml-1 text-sm text-black-600'>Dashboard</p>
        </div>
        <h1 className="text-3xl font-medium text-indigo-600">Profile Page</h1>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-600">User Info</h2>
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex-1">
              <label className="text-gray-500 font-medium">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-lg mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-500 font-medium">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 p-2 rounded-lg mt-1 bg-gray-100 cursor-not-allowed"
                value={user?.email}
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3 justify-center md:items-center">
            <div className="flex-1">
              <label className="text-gray-500 font-medium">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 p-2 rounded-lg mt-1"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center px-4 pt-6">
              <button
                onClick={handleProfileUpdate}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-600">Account Settings</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDeleteAccount}
              className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"
            >
              <Trash2 size={18} /> Delete Account
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-600">Activity Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-indigo-50 rounded-lg text-center">
              <p className="text-gray-500">Quizzes Taken</p>
              <p className="text-lg font-bold text-indigo-700">{previousQuizzes?.length || 0}</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg text-center">
              <p className="text-gray-500">Average Score</p>
              <p className="text-lg font-bold text-indigo-700">
                {previousQuizzes?.length > 0
                  ? Math.round(previousQuizzes.reduce((a, q) => a + q.score, 0) / previousQuizzes.length)
                  : 0}
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg text-center">
              <p className="text-gray-500">Saved Quizzes</p>
              <p className="text-lg font-bold text-indigo-700">{savedQuizzes?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-600">Quick Links</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/user/previous")}
              className="px-4 text-gray-500 py-2 border border-gray-400 rounded-md hover:border-indigo-200 hover:bg-indigo-200 transition"
            >
              Previous Quizzes
            </button>
            <button
              onClick={() => navigate("/user/saved-quizes")}
              className="px-4 text-gray-500 py-2 border border-gray-400 rounded-md hover:border-indigo-200 hover:bg-indigo-200 transition"
            >
              Saved Quizzes
            </button>
            <button
              onClick={() => navigate("/user/upload")}
              className="px-4 text-gray-500 py-2 border border-gray-400 rounded-md hover:border-indigo-200 hover:bg-indigo-200 transition"
            >
              Upload File
            </button>
            <button
              onClick={() => navigate("/user/create")}
              className="px-4 text-gray-500 py-2 border border-gray-400 rounded-md hover:border-indigo-200 hover:bg-indigo-200 transition"
            >
              Generate Quiz
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 flex justify-end gap-4">
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg shadow-md transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
