// CoursesPage.jsx
import React, { useState, useEffect } from 'react';
import CourseCard from '../../component/CauseCard';
import FilterSection from '../../component/FilterSection';
import { getAllCauses } from '../../services/CauseService';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
      type: 'all',
      category: 'all',
      language: 'all',
      priceRange: [0, 200],
    });
  
    const fetchCourses = async ()  => {
      const causes = (await getAllCauses(10)).data;
      console.log(causes);
      setCourses(causes);
      setFilteredCourses(causes);
    };

    useEffect(() => {
      fetchCourses();
    }, []);
  
    // Apply filters
    useEffect(() => {
      let result = [...courses];
      
      if (filters.type !== 'all') {
        result = result.filter(course => course.type === filters.type);
      }
      
      if (filters.category !== 'all') {
        result = result.filter(course => course.category === filters.category);
      }
      
      if (filters.language !== 'all') {
        result = result.filter(course => course.language === filters.language);
      }
      
      result = result.filter(course => 
        course.price >= filters.priceRange[0] && 
        course.price <= filters.priceRange[1]
      );
      
      setFilteredCourses(result);
    }, [filters, courses]);
  
    const handleFilterChange = (filterType, value) => {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    };
  
    const toggleFilters = () => {
      setShowFilters(!showFilters);
    };
  
    const resetFilters = () => {
      setFilters({
        type: 'all',
        category: 'all',
        language: 'all',
        priceRange: [0, 200],
      });
    };
  
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Explore Courses</h1>
          
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <button 
              onClick={toggleFilters}
              className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            <div className="flex items-center gap-4">
              <p className="text-gray-600 font-medium">{filteredCourses.length} courses found</p>
              <select 
                className="p-2 border border-gray-300 rounded-md bg-white"
                onChange={(e) => {
                  const sortedCourses = [...filteredCourses];
                  switch (e.target.value) {
                    case 'price-asc':
                      sortedCourses.sort((a, b) => a.price - b.price);
                      break;
                    case 'price-desc':
                      sortedCourses.sort((a, b) => b.price - a.price);
                      break;
                    case 'rating':
                      sortedCourses.sort((a, b) => b.rating - a.rating);
                      break;
                    default:
                      break;
                  }
                  setFilteredCourses(sortedCourses);
                }}
              >
                <option value="">Sort by</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
          
          {showFilters && (
            <div className="mb-6 bg-white p-6 rounded-lg border border-gray-100 shadow-md">
              <FilterSection 
                filters={filters} 
                onFilterChange={handleFilterChange} 
                onResetFilters={resetFilters} 
              />
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          
          {filteredCourses.length === 0 && (
            <div className="bg-yellow-50 p-8 rounded-lg border border-yellow-200 text-center">
              <h3 className="text-xl font-medium text-gray-800 mb-2">No courses found</h3>
              <p className="text-gray-600">Try adjusting your filter criteria</p>
              <button 
                onClick={resetFilters}
                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default CoursesPage;