import React from 'react'

function ButtonCompo() {
  return (
    <div>
        <style>
            {`
                @keyframes shine {
                    0% {
                        background-position: 0% 50%;
                    }
            
                    50% {
                        background-position: 100% 50%;
                    }
            
                    100% {
                        background-position: 0% 50%;
                    }
                }
                .button-bg {
                    background: conic-gradient(from 0deg, #00F5FF, #FF00C7, #FFD700, #00FF85, #8A2BE2, #00F5FF);
                    background-size: 300% 300%;
                    animation: shine 5s ease-out infinite;
                }
            `}
        </style>
        <div className="button-bg rounded-full p-0.5 hover:scale-102 transition duration-300 active:scale-100">
            <button className="px-8 text-sm py-2.5 text-indigo rounded-full font-medium bg-white hover:cursor-pointer">
                Get Started
            </button>
        </div>
    </div>
  )
}

export default ButtonCompo