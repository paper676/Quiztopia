import React from 'react'

function StactCard({ label, value }) {
    return (
        <div className="h-30 flex justify-center items-center flex-col bg-white shadow-md p-4 rounded-xl text-center hover:scale-101">
            <h4 className="text-gray-500 text-sm">{label}</h4>
            <p className="text-2xl font-semibold text-indigo-600">{value}</p>
        </div>
    )
}
export default StactCard