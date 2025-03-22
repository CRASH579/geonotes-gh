import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import logo from '../assets/logo.png'

const LandingPage = () => {
  

 

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <img 
            src={logo} 
            alt="GeoNotes Logo" 
            className="mx-auto h-32 w-auto mb-8"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to GeoNotes
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create, share, and discover location-based notes. Connect with others and explore the world around you.
          </p>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage