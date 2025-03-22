import React from 'react'
import Navbar from './Navbar'

const LandingPage = () => {
  

 

  return (
    <div className="min-h-screen flex flex-col">
    {/* Navbar */}
    <Navbar />

    {/* Container */}
    <div className="container mx-auto px-4 py-2 flex-grow">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mt-4 text-gray-800 mb-4">
          Welcome to Geonotes
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover a new way to interact with your surroundings. Geonotes allows you to leave notes and find notes left by others at specific locations. Explore the world with a new perspective!
        </p>
      </div>

      {/* Images Section */}
      <div className="flex flex-wrap justify-center items-center gap-2 my-4">
        <img
          src="./src/assets/map.svg"
          alt="App screenshot 1"
          className="w-[90px] sm:w-[110px] md:w-[130px] lg:w-[150px] h-auto object-contain" />
        <img
          src="./src/assets/nmap.png"
          alt="App screenshot 2"
          className="w-[90px] sm:w-[110px] md:w-[130px] lg:w-[150px] h-auto object-contain" />
        <img
          src="./src/assets/nhome.png"
          alt="App screenshot 3"
          className="w-[90px] sm:w-[110px] md:w-[130px] lg:w-[150px] h-auto object-contain" />
      </div>
      
      {/* About Section */}
      <div className="mb-8 text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          About Geonotes
        </h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Geonotes is your personal geolocation app that allows you to leave and discover notes at specific locations around the globe. Whether you're traveling or exploring your own city, Geonotes connects you with your surroundings uniquely.
        </p>
      </div>
    
      {/* Download Section */}
      <div className="flex justify-center mb-8">
        <a
          href="https://play.google.com/store/"
          target="_blank"
          rel="noopener noreferrer"
          className="transform hover:scale-105 transition-transform"
        >
          <img
            src="./assets/google.png"
            alt="Get it on Google Play"
            className="w-64 h-auto" />
        </a>
      </div>
    </div>

    {/* Footer */}
    <footer className="bg-[#00ffb4] text-center py-4">
      <p className="text-gray-800">
        &copy; 2025 Geonotes. All rights reserved.
      </p>
    </footer>
  </div>
  );
}

export default LandingPage