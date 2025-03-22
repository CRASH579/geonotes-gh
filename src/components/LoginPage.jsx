import React, { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { 
  auth, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  googleProvider 
} from '../utils/firebase.utils';

const LoginPage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">You are already signed in</h2>
        <Link 
          to="/"
          className="bg-emerald-400 text-white px-4 py-2 rounded-lg hover:bg-[#00ffb4]"
        >
          Go to Map
        </Link>
      </div>
    );
  }


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/webmap');
    } catch (error) {
      setError('Failed to login: ' + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (error) {
      setError('Failed to sign in with Google: ' + error.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center h-auto items-center ">
        <img
          className="w-[90px] sm:w-[110px] md:w-[200px] lg:w-[250px] h-auto mt-6 object-contain"
          src="./login.jpg"
        ></img>
        <div className="pt-4">
          <div className="text-center mb-4 font-semibold text-3xl">Login</div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-items-start items-start">
              <div className="">Enter your E-mail</div>
              <input
                className="mt-2 mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="text"
                placeholder="E-mail"
              ></input>
              <div className="flex flex-col justify-items-start items-start w-full">
                <div>Enter your Password</div>
                <div className="relative w-full">
                  <input
                    className="mt-2 mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <button onClick={handleLogin} className="mt-6 p-2 bg-emerald-400 font-semibold hover:bg-[#00ffb4] hover:text-white w-30 rounded-3xl transition-all scale-120">
              Login
            </button>
            <p className="pt-2 mt-4">
              Don't have an account?{" "}
              <Link
                className="hover:bg-[#00ffb4] hover:text-white w-30 rounded-md transition-all font-semibold"
                to={"/signup"}
              >
                SignUp
              </Link>
            </p>
            <div class="inline-flex items-center justify-center w-full">
              <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-black">
                or
              </span>
            </div>
            <button onClick={handleGoogleSignIn} className="flex items-center  mt-2 drop-shadow-2xl box-border border-1 p-2 hover:bg-[#00ffb4] hover:text-white w-60 rounded-3xl transition-all scale-100 font-light">
              <svg
                class="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="800px"
                height="800px"
                viewBox="-0.5 0 48 48"
                version="1.1"
              >
                {" "}
                <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
                <defs> </defs>{" "}
                <g
                  id="Icons"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  {" "}
                  <g
                    id="Color-"
                    transform="translate(-401.000000, -860.000000)"
                  >
                    {" "}
                    <g
                      id="Google"
                      transform="translate(401.000000, 860.000000)"
                    >
                      {" "}
                      <path
                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                        id="Fill-1"
                        fill="#FBBC05"
                      >
                        {" "}
                      </path>{" "}
                      <path
                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                        id="Fill-2"
                        fill="#EB4335"
                      >
                        {" "}
                      </path>{" "}
                      <path
                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                        id="Fill-3"
                        fill="#34A853"
                      >
                        {" "}
                      </path>{" "}
                      <path
                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                        id="Fill-4"
                        fill="#4285F4"
                      >
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>{" "}
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
      <footer className="bg-[#00ffb4] absolute bottom-0 w-full text-center py-4">
        <p className="text-gray-800">
          &copy; 2025 Geonotes. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
