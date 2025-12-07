import React, { useState, useRef } from "react";
import { X } from 'lucide-react'
import { UseAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function UploadFile() {
    const { axios, navigate, setCurrentQuiz } = UseAppContext();
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const inputRef = useRef(null);

    // Allowed files
    const validTypes = ["application/pdf", "text/plain",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

    // Handle file selection
    const handleSelectFile = (uploadedFile) => {
        setError("");

        if (!uploadedFile) return;

        if (!validTypes.includes(uploadedFile.type)) {
            return setError("Only PDF, TXT, and DOCX files are supported.");
        }

        if (uploadedFile.size > 5 * 1024 * 1024) {
            return setError("File size should not exceed 5MB.");
        }

        setFile(uploadedFile);
    };

    // Drag handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        handleSelectFile(droppedFile);
    };

    // Trigger file uploading
    const handleBrowse = () => inputRef.current.click();

    // remove file
    const deleteFile = () => {
        setFile(null);
        setError("");
        setIsGenerating(false);
        if (inputRef.current) {
            inputRef.current.value = null;   // IMPORTANT FIX
        }
    };

    // // Generate Quiz (no backend yet)
    // const handleGenerate = () => {
    //     setIsGenerating(true);

    //     setTimeout(() => {
    //         setIsGenerating(false);
    //         alert("This is where quiz generation will happen.");
    //     }, 2000);
    // };
    const handleGenerate = async () => {
        if (!file) return toast.error("Please upload a file first");

        setIsGenerating(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const { data } = await axios.post(
                "/api/quiz/from-file",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                }
            );

            if (data.success) {
                setCurrentQuiz(data.quiz);
                navigate("/user/create/quiz");
            } else {
                toast.error(data.message || "File quiz generation failed");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className='w-full no-scrollbar flex-1 h-[89vh] overflow-y-scroll bg-gradient-to-br from-indigo-50 via-white to-purple-50'>
            <div className="px-6 py-10 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6 text-indigo-900">
                    Generate Quiz From File
                </h1>
                <div
                    className={`w-full max-w-xl border-2 border-dashed rounded-xl p-10 cursor-pointer transition
          ${isDragging ? "border-indigo-600 bg-indigo-50" : "border-gray-400 bg-white"}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleBrowse}
                >
                    <div className="flex flex-col items-center">
                        <svg
                            className="w-12 h-12 text-indigo-600 mb-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 15v4a2 2 0 002 2h14a2 2 0 002-2v-4M7 10l5-5m0 0l5 5m-5-5v12"
                            />
                        </svg>
                        <p className="text-gray-700 font-medium">Drag & Drop your file here</p>
                        <p className="text-sm text-gray-500">PDF, TXT, DOCX supported</p>

                        <input
                            ref={inputRef}
                            type="file"
                            className="hidden"
                            onChange={(e) =>{
                                handleSelectFile(e.target.files[0])
                            }}
                        />
                    </div>
                </div>

                {error && (
                    <p className="mt-3 text-red-500 text-sm font-medium">{error}</p>
                )}

                {file && (
                    <div className="mt-8 w-full max-w-xl p-5 rounded-lg bg-white shadow">
                        <p className="font-semibold text-gray-800 text-xl">Selected File:</p>
                        <div className="flex flex-row items-center justify-between">
                            <p className="p-3 text-gray-600 text-sm mt-1 text-[18px]">{file.name}</p>
                            <button 
                             onClick={deleteFile}
                             title="Delete file"
                             className="hover:cursor-pointer"
                            >
                              <X size={21}/>
                            </button>
                        </div>

                        {/* <hr className="my-4" /> */}

                        {/* Quiz Options */}
                        {/* <div className="space-y-3">
                            <label className="block">
                                <span className="text-gray-700">Number of Questions</span>
                                <input
                                    type="number"
                                    min="1"
                                    max="50"
                                    className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-indigo-500"
                                />
                            </label>

                            <label className="block">
                                <span className="text-gray-700">Difficulty</span>
                                <select className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-indigo-500">
                                    <option>Easy</option>
                                    <option>Medium</option>
                                    <option>Hard</option>
                                </select>
                            </label>
                        </div> */}

                        {/* STEP 5 — Generate Button */}
                        <button
                            onClick={handleGenerate}
                            className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition lg:text-xl md:text:sm"
                        >
                            Generate Quiz
                        </button>
                    </div>
                )}

                {isGenerating && (
                    <div className="fixed inset-0 bg-black/40 bg-opacity-3 flex flex-col items-center justify-center">
                        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-white mt-3 text-sm animate-pulse">
                            Generating quiz from your file...
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UploadFile