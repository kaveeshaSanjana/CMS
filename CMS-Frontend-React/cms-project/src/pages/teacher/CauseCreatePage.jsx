import { useState } from 'react';

export default function CourseCreator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
    videoTutorials: [],
    certificate: null
  });

  // State for temporary video tutorial input
  const [tempVideo, setTempVideo] = useState({
    name: '',
    description: '',
    link: '',
    type: '',
    referenceLocation: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleTempVideoChange = (e) => {
    const { name, value } = e.target;
    setTempVideo({ ...tempVideo, [name]: value });
  };

  const handleFileChange = (e) => {
    setCourseData({ ...courseData, certificate: e.target.files[0] });
  };

  const addVideoTutorial = () => {
    if (tempVideo.link.trim() && tempVideo.name.trim()) {
      setCourseData({
        ...courseData,
        videoTutorials: [...courseData.videoTutorials, { ...tempVideo }]
      });
      // Reset temp video data
      setTempVideo({
        name: '',
        description: '',
        link: '',
        type: '',
        referenceLocation: ''
      });
    }
  };

  const removeVideoTutorial = (index) => {
    const updatedTutorials = [...courseData.videoTutorials];
    updatedTutorials.splice(index, 1);
    setCourseData({ ...courseData, videoTutorials: updatedTutorials });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Course created successfully!');
    console.log(courseData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Custom CSS for gold colors */}
      <style jsx>{`
        .bg-gold {
          background-color: #D4AF37;
        }
        .bg-gold-light {
          background-color: #F5EFD5;
        }
        .border-gold {
          border-color: #D4AF37;
        }
        .text-gold {
          color: #D4AF37;
        }
        .text-gold-dark {
          color: #B8860B;
        }
        .hover-bg-gold:hover {
          background-color: #B8860B;
        }
      `}</style>

      <div className="max-w-4xl mx-auto py-8 px-4">
        <header className="bg-gold text-white p-6 rounded-t-lg shadow-md mb-6">
          <h1 className="text-3xl font-bold text-center">Create Your Course</h1>
        </header>

        <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-gold">
          {/* Progress Bar */}
          <div className="px-6 py-4 bg-gold-light">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gold-dark">Step {currentStep} of 3</span>
              <span className="text-sm font-medium text-gold-dark">{Math.round((currentStep / 3) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-gold h-2.5 rounded-full" style={{ width: `${(currentStep / 3) * 100}%` }}></div>
            </div>
          </div>

          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gold-dark mb-4 pb-2 border-b border-gold-light">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Course Name</label>
                  <input
                    type="text"
                    name="name"
                    value={courseData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    placeholder="Enter course name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={courseData.description}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-gold focus:border-gold"
                    placeholder="Describe your course"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Video Tutorials */}
          {currentStep === 2 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gold-dark mb-4 pb-2 border-b border-gold-light">Video Tutorials</h2>
              
              {/* Add new tutorial form */}
              <div className="mb-6 bg-gold-light p-4 rounded-lg border border-gold">
                <h3 className="text-lg font-medium text-gold-dark mb-3">Add New Tutorial</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Tutorial Name</label>
                      <input
                        type="text"
                        name="name"
                        value={tempVideo.name}
                        onChange={handleTempVideoChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                        placeholder="Enter tutorial name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Video Link</label>
                      <input
                        type="text"
                        name="link"
                        value={tempVideo.link}
                        onChange={handleTempVideoChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                        placeholder="Enter video link"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={tempVideo.description}
                      onChange={handleTempVideoChange}
                      className="w-full p-3 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-gold focus:border-gold"
                      placeholder="Describe this tutorial"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Tutorial Type</label>
                      <select
                        name="type"
                        value={tempVideo.type}
                        onChange={handleTempVideoChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                      >
                        <option value="">Select Type</option>
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>
                        <option value="trial">Trial</option>
                        <option value="afterComplete">After Complete Before One</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Reference Location</label>
                      <select
                        name="referenceLocation"
                        value={tempVideo.referenceLocation}
                        onChange={handleTempVideoChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                      >
                        <option value="">Select Location</option>
                        <option value="youtube">YouTube</option>
                        <option value="drive">Google Drive</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={addVideoTutorial}
                      className="bg-gold text-white py-2 px-4 rounded-lg hover-bg-gold transition duration-300"
                    >
                      Add Tutorial
                    </button>
                  </div>
                </div>
              </div>

              {/* List of added tutorials */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Added Tutorials:</h3>
                {courseData.videoTutorials.length > 0 ? (
                  <div className="space-y-3">
                    {courseData.videoTutorials.map((tutorial, index) => (
                      <div key={index} className="bg-white p-4 rounded-md border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gold-dark">{tutorial.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{tutorial.description}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeVideoTutorial(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                          <div><span className="font-medium">Link:</span> <span className="text-blue-600">{tutorial.link}</span></div>
                          <div><span className="font-medium">Type:</span> {tutorial.type || 'Not specified'}</div>
                          <div><span className="font-medium">Location:</span> {tutorial.referenceLocation || 'Not specified'}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic p-4 bg-gray-50 rounded-lg">No tutorials added yet</p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Certificate Upload */}
          {currentStep === 3 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gold-dark mb-4 pb-2 border-b border-gold-light">Certificate</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Upload Certificate Template (Optional)</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Upload a certificate template that will be issued to students upon course completion
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Course Summary</h3>
                  <div className="bg-gold-light p-4 rounded-lg">
                    <p><span className="font-medium">Name:</span> {courseData.name || 'Not specified'}</p>
                    <p><span className="font-medium">Video Tutorials:</span> {courseData.videoTutorials.length}</p>
                    <p><span className="font-medium">Certificate:</span> {courseData.certificate ? 'Uploaded' : 'Not uploaded'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="px-6 py-4 bg-gray-50 flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-4 py-2 rounded-lg ${
                currentStep === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-gold text-white px-4 py-2 rounded-lg hover-bg-gold transition duration-300"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
              >
                Create Course
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}