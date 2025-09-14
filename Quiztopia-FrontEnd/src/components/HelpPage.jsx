import React from "react";
import { HelpCircle, Mail, Phone,ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function HelpPage() {
  return (
    <div className="lg:p-5 sm:p-8 w-full flex-1 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <div className="flex flex-row items-center">
          <Link to='/' className="hover:scale-105 p-1 rounded-full transition hover:bg-zinc-100"><ArrowLeft size={18}/></Link>
          <p className='ml-1 text-sm text-black-600'>Home</p>
        </div>
        <div className="flex items-center gap-3">
          <HelpCircle size={28} className="text-indigo-700" />
          <h1 className="text-3xl font-bold text-indigo-900">Help & Support</h1>
        </div>
        <p className="text-gray-600">
          Need help? Here’s how to get the most out of your Quiz App.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-indigo-800 mb-3">Quick Guide</h2>
          <ul className="space-y-2 text-gray-700 list-disc pl-5">
            <li><b>Generate Quiz:</b> Enter a topic, select difficulty, and number of questions to create a quiz instantly.</li>
            <li><b>Save/Unsave Quizzes:</b> Use the star icon to save quizzes for later or unsave them anytime.</li>
            <li><b>Previous Quizzes:</b> Access your quiz history, review scores, and retry topics.</li>
            <li><b>Profile:</b> Update your name or password, and view your activity summary.</li>
            <li><b>Delete Account:</b> Permanently remove your account and all related data.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-indigo-800 mb-3">FAQs</h2>
          <div className="space-y-3 text-gray-700">
            <div>
              <p className="font-medium">❓ How do I create a quiz?</p>
              <p>Go to the “Generate Quiz” page, enter details, and click <i>Generate with AI</i>.</p>
            </div>
            <div>
              <p className="font-medium">❓ Can I retake a quiz?</p>
              <p>Yes! All completed quizzes are saved in <b>Previous Quizzes</b> — you can revisit them anytime.</p>
            </div>
            <div>
              <p className="font-medium">❓ What happens if I delete my account?</p>
              <p>All your quizzes, progress, and saved data will be deleted permanently.</p>
            </div>
            <div>
              <p className="font-medium">❓ How do saved quizzes work?</p>
              <p>When you star a quiz, it appears in <b>Saved Quizzes</b>. You can unsave it anytime.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-indigo-800 mb-3">Contact Support</h2>
          <p className="text-gray-700">Still need help? Reach out to us:</p>
          <div className="mt-2 space-y-2 text-gray-700">
            <p className="flex items-center gap-2">
              <Mail size={18} className="text-indigo-600" /> support@quizapp.com
            </p>
            <p className="flex items-center gap-2">
              <Phone size={18} className="text-indigo-600" /> +91 98765 43210
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HelpPage;