import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center bg-slate-700 text-white py-3 px-4">
      <div className="logo mb-2 sm:mb-0">
        <span className="font-bold text-2xl sm:text-xl mx-0 sm:mx-8">PlanPal</span>
      </div>
      <ul className="flex gap-4 sm:gap-8 mx-0 sm:mx-9">
        <li className="cursor-pointer hover:font-bold transition-all">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar