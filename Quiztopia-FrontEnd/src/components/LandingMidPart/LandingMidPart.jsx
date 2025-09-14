import React from 'react'
import ButtonCompo from './ButtonCompo'
import { Link } from 'react-router-dom'
import Testimonial from './Testimonial'
import Faqs from './Faqs'
import bgImage from '../../assets/bg.jpg'

function LandingMidPart() {
    return (
        <div>
            <div class="bg-white py-24 sm:py-32">
                <div class="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className='w-full min-h-[20rem] flex flex-col justify-center items-center text-center mb-10 bg-cover bg-center bg-no-repeat rounded-md' style={{ backgroundImage: `url(${bgImage})` }}>
                        <div class="mx-auto max-w-2xl lg:max-w-3xl lg:text-center">
                            <h2 class="text-base/7 font-semibold text-zinc-600">Ready to Quiz Smarter?</h2>
                            <p class="mt-3 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight">Create Custom Quizzes in <span className='text-indigo-900'>Seconds</span></p>
                            <p class="mt-6 lg:text-lg/8 text-gray-700">Our intelligent AI instantly generates engaging and accurate quizzes from any topic or piece of text. Stop spending hours writing questions and start learning faster.</p>
                        </div>
                        <div className='w-full pt-6 flex justify-center'>
                            <Link to="/login"><ButtonCompo /></Link>
                        </div>
                    </div>
                    <div class="mx-auto mt-16 max-w-3xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl class="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2">
                            <div class="relative pl-16 border border-gray-300 p-4 rounded-md">
                                <dt class="text-base/7 font-semibold text-gray-900">
                                    <div class="absolute top-13 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600 m-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkle-icon lucide-sparkle color-red-200"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" /></svg>
                                    </div>
                                    <p>Instant AI Generation</p>
                                </dt>
                                <dd class="mt-2 text-gray-600">Simply provide a topic or paste text. Our AI analyzes the content and crafts relevant, high-quality questions and answers for you, saving you time and effort.</dd>
                            </div>
                            <div class="relative pl-16 border border-gray-300 p-4 rounded-md">
                                <dt class="text-base/7 font-semibold text-gray-900">
                                    <div class="absolute top-13 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600 m-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings2-icon lucide-settings-2"><path d="M14 17H5" /><path d="M19 7h-9" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" /></svg>
                                    </div>
                                    Full Customization
                                </dt>
                                <dd class="mt-2 text-gray-600">Fine-tune your quizzes to perfection. Adjust difficulty levels, choose Number of questions, true/false or open-ended questions, and control the length of the quiz to fit any study session or classroom need.</dd>
                            </div>
                        </dl>
                    </div>
                    <div>
                        <Testimonial />
                    </div>
                    <div>
                        <Faqs />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingMidPart