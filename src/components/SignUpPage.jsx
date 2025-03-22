import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { 
  auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  googleProvider
} from "../utils/firebase.utils";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError("Failed to create account: " + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      setError("Failed to sign in with Google: " + error.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center h-auto items-center">
        <img
          className="w-[90px] sm:w-[110px] md:w-[200px] lg:w-[250px] mt-6 h-auto object-contain"
          src="./signin.jpg"
        ></img>
        <div className="pt-4">
          <div className="text-center mb-4 font-semibold text-3xl">SignUp</div>
          <form onSubmit={handleSubmit} className="flex flex-col justify-items-start items-start">
            <div className="">Enter your E-mail</div>
            <input
              className="mt-2 mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="E-mail"
              required
            />
            <div>Enter your Password</div>
            <input
              className="mt-2 mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="Password"
              required
            />
            <div>Confirm your Password</div>
            <input
              className="mt-2 mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="cpassword"
              type="password"
              placeholder="Confirm Password"
              required
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              type="submit"
              className="mt-6 p-2 bg-emerald-400 font-semibold hover:bg-[#00ffb4] hover:text-white w-full rounded-3xl transition-all"
            >
              Sign Up
            </button>
          </form>
        </div>
        <p className="mt-4">
          Already have an account?{" "}
          <Link
            className="hover:bg-[#00ffb4] hover:text-white w-30 rounded-md transition-all font-semibold"
            to={"/login"}
          >
            Login
          </Link>
        </p>
        <div class="inline-flex items-center justify-center w-full">
          <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-black">
            or
          </span>
        </div>
        <button onClick={handleGoogleSignIn} className="flex items-center w-60 mt-2 drop-shadow-2xl box-border border-1 p-2 hover:bg-[#00ffb4] hover:text-white rounded-3xl transition-all scale-100 font-light">
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
              <g id="Color-" transform="translate(-401.000000, -860.000000)">
                {" "}
                <g id="Google" transform="translate(401.000000, 860.000000)">
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
      <footer className="bg-[#00ffb4] absolute bottom-0 w-full text-center py-4">
        <p className="text-gray-800">
          &copy; 2025 Geonotes. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default SignUpPage;
