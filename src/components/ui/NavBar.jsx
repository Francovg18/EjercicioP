import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";

function NavBar() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); 

  return (
    <>
      <header 
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
          bg-gradient-to-r from-teal-900 via-teal-700 to-cyan-500
          text-white p-4
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* fondo*/}
        <div className={`
          absolute inset-0 opacity-0 transition-opacity duration-700
          bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `} />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse top-4 left-1/4"></div>
          <div className="absolute w-1 h-1 bg-white/40 rounded-full animate-ping top-8 right-1/3 delay-300"></div>
          <div className="absolute w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce top-6 left-3/4 delay-700"></div>
        </div>

        <div className="max-w-6xl mx-auto flex justify-between items-center relative z-10">
          {/* título */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className={`
              w-10 h-10 rounded-xl bg-gradient-to-br from-white/20 to-white/5 
              backdrop-blur-sm border border-white/30 flex items-center justify-center
              transition-transform duration-300 
              ${isHovered ? 'scale-110 rotate-6' : 'scale-100'}
            `}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
              </svg>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent transition-all duration-300">
                JSONPlaceholder
              </h1>
              <p className="text-sm text-white/70 -mt-1">Blog Alex Franco Choque Vega</p>
            </div>
          </div>

          {/* navegacion */}
          <nav className="flex items-center space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) => `
                relative px-5 py-2 rounded-full font-medium transition-all duration-300
                ${isActive
                  ? 'bg-white text-indigo-700 shadow-lg scale-105'
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:text-indigo-200 hover:scale-105'
                }
                overflow-hidden
              `}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Inicio</span>
              </span>
            </NavLink>
          </nav>
        </div>

        <div className={`
          absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent
          transition-all duration-700 w-full
        `}></div>
      </header>

      <div className="h-20"></div>
    </>
  )
}

export default NavBar
