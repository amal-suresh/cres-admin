import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaUser, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!username || !password) {
          toast.error('Please enter both username and password!');
          return;
        }
      
        if (username === 'admin' && password === 'admin') {
          toast.success('Login successful!');
          navigate('/dashboard');
        } else {
          toast.error('Invalid credentials!');
        }
      };
      

    return (
        <div className="min-h-screen flex items-center justify-center bg-violet-100">
            <div className="bg-white shadow-lg rounded-2xl p-10 w-[90%] max-w-md">
                <h2 className="text-3xl font-bold text-violet-600 mb-6 text-center">CRES Login</h2>

                {/* Username Field */}
                <div className="relative mb-4">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400" />
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full pl-10 p-3 border border-violet-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/* Password Field with Eye Icon */}
                <div className="relative mb-6">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400" />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="w-full pl-10 pr-10 p-3 border border-violet-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-violet-400 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                {/* Login Button */}
                <button
                    onClick={handleLogin}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-md flex items-center justify-center gap-2 
    transition duration-300 ease-in-out transform hover:scale-105"
                >
                    <FaSignInAlt /> Login
                </button>
            </div>
        </div>
    );
};

export default Login;
