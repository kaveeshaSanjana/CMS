import React, { useState } from 'react';
import { login } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log('Login form submitted:', formData);
        // Add your authentication logic here
        const res = await login(formData.username,formData.password,formData.rememberMe);
        if(res.success){
            navigate("/causes")
        }
        
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Image Column */}
                    <div className="md:w-1/2 bg-gradient-to-br from-yellow-100 to-yellow-400 p-8 flex items-center justify-center">
                        
                    </div>

                    {/* Form Column */}
                    <div className="md:w-1/2 p-8">
                        <h2 className="text-3xl font-bold text-center text-yellow-800 mb-6">Welcome Back</h2>

                        {/* Social Login Buttons */}
                        <div className="mb-6">
                            <button
                                className="w-full mb-3 flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition duration-300 ease-in-out hover:bg-blue-700"
                            >
                                <i className="fab fa-facebook-f mr-2"></i> Continue with Facebook
                            </button>
                            <button
                                className="w-full flex items-center justify-center bg-white text-gray-700 border border-gray-200 py-3 px-4 rounded-lg font-medium transition duration-300 ease-in-out hover:bg-gray-50"
                                href="http://localhost:8080/oauth2/authorization/google"
                            >
                                <span className="mr-2">
                                    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                        <path fill="#4285F4" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                                    </svg>
                                </span>
                                <a href="http://localhost:8080/oauth2/authorization/google">Continue with Google</a>
                                
                            </button>
                        </div>

                        <div className="flex items-center my-6">
                            <div className="flex-grow h-px bg-gray-200"></div>
                            <span className="px-4 text-sm text-gray-500">OR</span>
                            <div className="flex-grow h-px bg-gray-200"></div>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                                    placeholder="Username or Email"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <div className="mb-6 flex justify-between items-center">
                                <div className="flex items-center">
                                    <input
                                        id="rememberMe"
                                        name="rememberMe"
                                        type="checkbox"
                                        checked={formData.rememberMe}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#" className="text-sm font-medium text-yellow-800 hover:text-yellow-600 hover:underline">
                                    Forgot Password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-yellow-600 transform hover:-translate-y-1"
                            >
                                Sign In
                            </button>
                        </form>

                        <div className="text-center mt-6">
                            <p className="text-gray-600">
                                Don't have an account?
                                <a href="/register  " className="ml-1 font-medium text-yellow-800 hover:text-yellow-600 hover:underline">
                                    Register now
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}