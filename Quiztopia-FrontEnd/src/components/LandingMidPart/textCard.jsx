import React from 'react'

function textCard() {
    return (
        <div class="relative pl-16">
            <dt class="text-base/7 font-semibold text-gray-900">
                <div class="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-white">
                        <path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                Full Customization
            </dt>
            <dd class="mt-2 text-base/7 text-gray-600">Fine-tune your quizzes to perfection. Adjust difficulty levels, choose from multiple-choice, true/false, or open-ended questions, and control the length of the quiz to fit any study session or classroom need.</dd>
        </div>
    )
}

export default textCard