// CourseCard.jsx
import React from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const {id, title, creator, price, videos, hours, thumbnail, category, type, rating } = course;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <img 
        src={thumbnail} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
            {category}
          </span>
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">
            {type}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{title}</h3>
        
        <p className="text-sm text-gray-600 mb-2">by {creator}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <div className="flex items-center mr-3">
            <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {hours} hours
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
            {videos} videos
          </div>
        </div>
        
        <div className="flex items-center mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-1">{rating}</span>
        </div>
        
        {/* Price and Button */}
        <div className="flex justify-between items-center mt-2">
          <div className="text-xl font-bold text-gray-800">
            {price === 0 ? 'Free' : `$${price.toFixed(2)}`}
          </div>
          <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition-colors duration-300" onClick = {() =>{
            navigate(`/cause/${id}`)
            }}>
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
