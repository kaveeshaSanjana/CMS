import React from 'react';

const FilterSection = ({ filters, onFilterChange, onResetFilters }) => {
  const categories = ['Development', 'Design', 'Marketing', 'Business', 'Data Science', 'IT & Software'];
  const types = ['Video', 'Course', 'Workshop', 'Webinar'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];
  
  const handlePriceChange = (e, index) => {
    const newValue = parseInt(e.target.value);
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = newValue;
    
    if (index === 0 && newValue > filters.priceRange[1]) {
      newPriceRange[1] = newValue;
    }
    if (index === 1 && newValue < filters.priceRange[0]) {
      newPriceRange[0] = newValue;
    }
    
    onFilterChange('priceRange', newPriceRange);
  };
  
  const FilterGroup = ({ title, options, currentValue, filterType }) => {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-800">{title}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          <button
            className={`px-3 py-2 rounded-md text-sm ${
              currentValue === 'all' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => onFilterChange(filterType, 'all')}
          >
            All
          </button>
          
          {options.map(option => (
            <button
              key={option}
              className={`px-3 py-2 rounded-md text-sm ${
                currentValue === option 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => onFilterChange(filterType, option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Filter Courses</h2>
        <button 
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors duration-300"
          onClick={onResetFilters}
        >
          Reset All Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FilterGroup
          title="Category"
          options={categories}
          currentValue={filters.category}
          filterType="category"
        />
        
        <FilterGroup
          title="Type"
          options={types}
          currentValue={filters.type}
          filterType="type"
        />
        
        <FilterGroup
          title="Language"
          options={languages}
          currentValue={filters.language}
          filterType="language"
        />
      </div>
      
      {/* Price Range Slider */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3 text-gray-800">Price Range</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700 text-sm">${filters.priceRange[0]}</span>
              <span className="text-gray-700 text-sm">${filters.priceRange[1]}</span>
            </div>
            <div className="relative h-2 rounded-full bg-gray-200">
              <div 
                className="absolute h-2 rounded-full bg-yellow-500"
                style={{
                  left: `${(filters.priceRange[0] / 200) * 100}%`,
                  width: `${((filters.priceRange[1] - filters.priceRange[0]) / 200) * 100}%`
                }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
              <input 
                type="range" 
                min="0" 
                max="200" 
                step="5"
                value={filters.priceRange[0]} 
                onChange={(e) => handlePriceChange(e, 0)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
              />
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs text-gray-500">$0</span>
                <input 
                  type="number" 
                  min="0" 
                  max={filters.priceRange[1]} 
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-16 p-1 text-center border border-gray-300 rounded-md"
                />
                <span className="text-xs text-gray-500">$200</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
              <input 
                type="range" 
                min="0" 
                max="200" 
                step="5"
                value={filters.priceRange[1]} 
                onChange={(e) => handlePriceChange(e, 1)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
              />
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs text-gray-500">$0</span>
                <input 
                  type="number" 
                  min={filters.priceRange[0]} 
                  max="200" 
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-16 p-1 text-center border border-gray-300 rounded-md"
                />
                <span className="text-xs text-gray-500">$200</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center">
            <input
              id="free-courses"
              type="checkbox"
              checked={filters.priceRange[0] === 0 && filters.priceRange[1] === 0}
              onChange={() => {
                if (filters.priceRange[0] === 0 && filters.priceRange[1] === 0) {
                  onFilterChange('priceRange', [0, 200]);
                } else {
                  onFilterChange('priceRange', [0, 0]);
                }
              }}
              className="w-4 h-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
            />
            <label htmlFor="free-courses" className="ml-2 text-gray-700">
              Free Courses Only
            </label>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button 
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition-colors duration-300"
          onClick={() => onResetFilters()}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
