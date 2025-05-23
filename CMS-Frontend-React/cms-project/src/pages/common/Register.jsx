import React, { useState, useRef } from 'react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT',
    agreeTerms: false
  });
  
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form (password match, terms agreement, etc.)
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    console.log('Registration form submitted:', { ...formData, profileImage });
    // Handle form submission to backend here
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image Column - Hidden on mobile */}
          <div className=" md:w-1/2 bg-gradient-to-br from-yellow-100 to-yellow-400 p-8 flex items-center justify-center">
            <div className="w-full max-w-sm">
              
            </div>
          </div>
          
          {/* Form Column */}
          <div className="md:w-1/2 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-yellow-800 mb-6">Create Account</h2>
            
            {/* Social Registration Buttons */}
            <div className="mb-6">
              <button 
                className="w-full mb-3 flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition duration-300 ease-in-out hover:bg-blue-700"
              >
                <i className="fab fa-facebook-f mr-2"></i> Register with Facebook
              </button>
              <button 
                className="w-full flex items-center justify-center bg-white text-gray-700 border border-gray-200 py-3 px-4 rounded-lg font-medium transition duration-300 ease-in-out hover:bg-gray-50"
              >
                <span className="mr-2">
                  <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="#4285F4" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                  </svg>
                </span> 
                Register with Google
              </button>
            </div>
            
            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-200"></div>
              <span className="px-4 text-sm text-gray-500">OR</span>
              <div className="flex-grow h-px bg-gray-200"></div>
            </div>
            
            {/* Registration Form */}
            <form onSubmit={handleSubmit}>
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center mb-6">
                <div 
                  className="w-24 h-24 mb-3 rounded-full bg-gray-200 border-2 border-yellow-200 flex items-center justify-center overflow-hidden"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : (
                    <i className="fas fa-user text-4xl text-gray-400"></i>
                  )}
                </div>
                <div className="relative">
                  <button 
                    type="button"
                    onClick={triggerFileInput}
                    className="bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm hover:bg-gray-300 transition"
                  >
                    <i className="fas fa-camera mr-2"></i> Upload Profile Picture
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
              
              {/* User Role Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">I am a:</label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="relative">
                    <input 
                      type="radio" 
                      id="student" 
                      name="role" 
                      value="STUDENT" 
                      checked={formData.role === 'STUDENT'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <label 
                      htmlFor="student" 
                      className={`flex flex-col items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition ${
                        formData.role === 'STUDENT' ? 'border-yellow-400 bg-yellow-100' : 'border-gray-200'
                      }`}
                    >
                      <i className={`fas fa-user-graduate text-2xl mb-1 ${formData.role === 'STUDENT' ? 'text-yellow-700' : 'text-gray-500'}`}></i>
                      <span className="text-sm">Student</span>
                    </label>
                  </div>
                  <div className="relative">
                    <input 
                      type="radio" 
                      id="teacher" 
                      name="role" 
                      value="TEACHER" 
                      checked={formData.role === 'TEACHER'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <label 
                      htmlFor="teacher" 
                      className={`flex flex-col items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition ${
                        formData.role === 'TEACHER' ? 'border-yellow-400 bg-yellow-100' : 'border-gray-200'
                      }`}
                    >
                      <i className={`fas fa-chalkboard-teacher text-2xl mb-1 ${formData.role === 'TEACHER' ? 'text-yellow-700' : 'text-gray-500'}`}></i>
                      <span className="text-sm">Teacher</span>
                    </label>
                  </div>
                  <div className="relative">
                    <input 
                      type="radio" 
                      id="admin" 
                      name="role" 
                      value="ADMIN" 
                      checked={formData.role === 'ADMIN'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <label 
                      htmlFor="admin" 
                      className={`flex flex-col items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition ${
                        formData.role === 'ADMIN' ? 'border-yellow-400 bg-yellow-100' : 'border-gray-200'
                      }`}
                    >
                      <i className={`fas fa-user-shield text-2xl mb-1 ${formData.role === 'ADMIN' ? 'text-yellow-700' : 'text-gray-500'}`}></i>
                      <span className="text-sm">Admin</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Personal Information */}
              <div className="mb-4">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50" 
                  placeholder="Full Name" 
                  required 
                />
              </div>
              <div className="mb-4">
                <input 
                  type="text" 
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50" 
                  placeholder="Username" 
                  required 
                />
              </div>
              <div className="mb-4">
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50" 
                  placeholder="Email Address" 
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
              <div className="mb-4">
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50" 
                  placeholder="Confirm Password" 
                  required 
                />
              </div>
              
              <div className="mb-6">
                <div className="flex items-start">
                  <input 
                    id="agreeTerms" 
                    name="agreeTerms"
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="h-4 w-4 mt-1 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded" 
                    required
                  />
                  <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-yellow-800 hover:text-yellow-600 hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-yellow-800 hover:text-yellow-600 hover:underline">Privacy Policy</a>
                  </label>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-yellow-600 transform hover:-translate-y-1"
              >
                Register
              </button>
            </form>
            
            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account? 
                <a href="#" className="ml-1 font-medium text-yellow-800 hover:text-yellow-600 hover:underline">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}