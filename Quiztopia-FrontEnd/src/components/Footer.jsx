import React from 'react'
import AppLogo from '../assets/AppLogo.png'
import { Link } from 'react-router-dom';
function Footer() {
    const linkSections = [
        {
            title: "Quick Links",
            links: ["Home", "Contact Us", "FAQs"]
        },
        {
            title: "Need Help?",
            links: ["Contact Us"]
        },
        {
            title: "Follow Us",
            links: ["Instagram", "Twitter", "Facebook", "YouTube"]
        }
    ];

    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10 bg-gray-100">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
                <div>
                    <img className="w-44 md:w-42" src={AppLogo} alt="LogoColored" />
                    <p className="max-w-[410px] mt-6 text-sm">Create engaging, customizable quizzes on any topic instantly. Perfect for educators, students, and content creators.</p>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {linkSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href="/" className="hover:underline transition">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-4 text-center tracking-tighter text-sm md:text-base text-gray-800">
                Copyright 2025 © Quiztopia All Right Reserved.
            </p>
        </div>
    );
}

export default Footer