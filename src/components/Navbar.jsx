import React,{ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase.utils';
import { signOut } from 'firebase/auth';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    
    const getUserDisplayName = () => {
        if (user) {
            if (user.displayName) {
                return user.displayName;
            }
            // Extract name from email (everything before @)
            return user.email.split('@')[0];
        }
        return '';
    };

    const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
    console.log(user);
  };
    return (
        <header className="flex justify-between items-center text-black py-3 px-8 md:px-32 bg-white drop-shadow-md">
            <div className="flex items-center gap-4">
                <a href='/' className="flex items-center hover:scale-105 transition-all">
                    <img 
                        src="/geonotes-gh/logo.svg"
                        className="w-8 h-8"
                        alt="logo"
                    />
                    <span className="ml-3 text-2xl font-semibold text-black ">Geonotes</span>
                </a>
            </div>
            
            {/* Desktop Navigation */}
            <nav className='hidden lg:flex items-center gap-12 font-semibold text-base'>
                <Link to={"/notes"} className='p-3 hover:bg-[#00ffb4] hover:text-white rounded-md transition-all'>Notes</Link>
                <Link to={"/webmap"} className='p-3 hover:bg-[#00ffb4] hover:text-white rounded-md transition-all'>Web Client</Link>
                <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">{getUserDisplayName()}</span>
                <button
                  onClick={handleSignOut}
                  className="bg-emerald-400 text-white px-4 py-2 rounded-lg hover:bg-[#00ffb4] transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-emerald-400 text-white px-4 py-2 rounded-lg hover:bg-[#00ffb4] transition-colors"
              >
                Login
              </Link>
            )}
          </div>
            </nav>
            
            {/* Mobile Menu Toggle */}
            <button 
                className='lg:hidden'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <i className='bx bx-menu text-4xl cursor-pointer'></i>
            </button>
            
            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg">
                    <nav className="flex flex-col">
                        <Link 
                            to={"/"}
                            className='text-center p-4 border-b hover:bg-[#00ffb4] hover:text-white transition-all'
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link 
                            to={"/webmap"}
                            className='text-center p-4 border-b hover:bg-[#00ffb4] hover:text-white transition-all'
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Web Client
                        </Link>
                        <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">{user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="bg-emerald-400 text-white px-4 py-2 rounded-lg hover:bg-[#00ffb4] transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-emerald-400 text-white px-4 py-2 rounded-lg hover:bg-[#00ffb4] transition-colors"
              >
                Login
              </Link>
            )}
          </div>
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Navbar