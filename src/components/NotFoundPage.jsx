import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const NotFoundPage = () => {
  return (
    <div>
        <Navbar/>
        <div className='flex flex-col justify-center space-between h-screen items-center '>
        <h1 className='text-4xl font-bold text-center mb-10'>404 Not Found</h1>
        <Link to="/">
        <button className='p-2 hover:bg-[#00ffb4] hover:text-white rounded-md transition-all scale-120'>Go back to Home</button>
        </Link>
        </div>
        <footer className="bg-[#00ffb4] text-center py-4">
      <p className="text-gray-800">
        &copy; 2025 Geonotes. All rights reserved.
      </p>
    </footer>
    </div>
  )
}

export default NotFoundPage