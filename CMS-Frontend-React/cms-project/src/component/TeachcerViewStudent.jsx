import { useState, useEffect } from 'react';
import { Search, Filter, User, X, ChevronDown, Calendar, CreditCard } from 'lucide-react';

// Main TeacherDashboard component
export default function TeacherViewStudent() {
  // State for students data
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // State for popup
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  
  // Mock causes data
  const causes = [
    { id: 1, name: 'Environmental Conservation', enrolled: 32 },
    { id: 2, name: 'Childhood Education', enrolled: 45 },
    { id: 3, name: 'Animal Welfare', enrolled: 28 },
    { id: 4, name: 'Food Security', enrolled: 19 }
  ];

  // Fetch students data (simulated)
  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock student data
        const mockStudents = [
          {
            id: 1,
            name: 'sss',
            email: 'salk',
            joinDate: '45678io0',
            enrolledCauses: [1, 3],
            payments: [
              { id: 101, amount: 25, date: '2025-02-15', causeId: 1 },
              { id: 102, amount: 40, date: '2025-03-10', causeId: 3 }
            ],
            active: true,
            completedLessons: 8
          }];
        
        setStudents(mockStudents);
        setFilteredStudents(mockStudents);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load student data. Please try again later.');
        setIsLoading(false);
      }
    };
    
    fetchStudents();
  }, []);
  
  // Filter students based on search term and filter option
  useEffect(() => {
    let result = [...students];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filterBy !== 'all') {
      switch(filterBy) {
        case 'active':
          result = result.filter(student => student.active);
          break;
        case 'inactive':
          result = result.filter(student => !student.active);
          break;
        case 'recent':
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          result = result.filter(student => new Date(student.joinDate) >= thirtyDaysAgo);
          break;
        case 'allCauses':
          result = result.filter(student => student.enrolledCauses.length === causes.length);
          break;
        default:
          // Filter by specific cause ID
          if (filterBy.startsWith('cause-')) {
            const causeId = parseInt(filterBy.split('-')[1]);
            result = result.filter(student => student.enrolledCauses.includes(causeId));
          }
      }
    }
    
    setFilteredStudents(result);
  }, [searchTerm, filterBy, students]);
  
  // Handle student click to show details
  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setShowPopup(true);
  };

  // Get cause name by ID
  const getCauseName = (id) => {
    const cause = causes.find(c => c.id === id);
    return cause ? cause.name : 'Unknown Cause';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto" style={{ backgroundColor: '#FFFFFF' }}>
      <h1 className="text-3xl font-bold mb-6" style={{ color: '#D4AF37' }}>Teacher Dashboard</h1>
      
      {/* Search and filter section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search students by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
              style={{ focusRingColor: '#D4AF37' }}
            />
          </div>
          
          {/* Filter button and dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white"
              style={{ 
                backgroundColor: '#D4AF37', 
                transition: 'background-color 0.3s' 
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#B8860B'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#D4AF37'}
            >
              <Filter size={18} />
              Filter Students
              <ChevronDown size={16} />
            </button>
            
            {showFilters && (
              <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                <div className="py-1">
                  <button 
                    onClick={() => {setFilterBy('all'); setShowFilters(false);}}
                    className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                  >
                    All Students
                  </button>
                  <button 
                    onClick={() => {setFilterBy('active'); setShowFilters(false);}}
                    className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                  >
                    Active Students
                  </button>
                  <button 
                    onClick={() => {setFilterBy('inactive'); setShowFilters(false);}}
                    className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                  >
                    Inactive Students
                  </button>
                  <button 
                    onClick={() => {setFilterBy('recent'); setShowFilters(false);}}
                    className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                  >
                    Recently Joined (30 days)
                  </button>
                  <button 
                    onClick={() => {setFilterBy('allCauses'); setShowFilters(false);}}
                    className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                  >
                    Enrolled in All Causes
                  </button>
                </div>
                <div className="py-1">
                  <p className="px-4 py-2 text-sm font-medium text-gray-700">Filter by Cause:</p>
                  {causes.map(cause => (
                    <button 
                      key={cause.id}
                      onClick={() => {setFilterBy(`cause-${cause.id}`); setShowFilters(false);}}
                      className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                    >
                      {cause.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Active filter indicator */}
        {filterBy !== 'all' && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Filtered by: </span>
            <span 
              className="px-3 py-1 rounded-full inline-flex items-center gap-1" 
              style={{ backgroundColor: '#F5EFD5' }}
            >
              {filterBy === 'active' && 'Active Students'}
              {filterBy === 'inactive' && 'Inactive Students'}
              {filterBy === 'recent' && 'Recently Joined'}
              {filterBy === 'allCauses' && 'Enrolled in All Causes'}
              {filterBy.startsWith('cause-') && `Cause: ${getCauseName(parseInt(filterBy.split('-')[1]))}`}
              <button 
                onClick={() => setFilterBy('all')}
                className="ml-1 rounded-full p-0.5 hover:bg-gray-200"
              >
                <X size={14} />
              </button>
            </span>
          </div>
        )}
      </div>
      
      {/* Student list */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#D4AF37' }}></div>
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">
            {error}
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No students found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead style={{ backgroundColor: '#F5EFD5' }}>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Student</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Join Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Enrolled Causes</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr 
                    key={student.id} 
                    onClick={() => handleStudentClick(student)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F5EFD5' }}>
                          <User size={20} style={{ color: '#D4AF37' }} />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium">{student.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {new Date(student.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-700">{student.enrolledCauses.length} causes</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${student.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {student.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Student details popup */}
      {showPopup && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto p-0">
            {/* Header */}
            <div className="p-6 flex justify-between items-center border-b" style={{ backgroundColor: '#F5EFD5' }}>
              <h2 className="text-xl font-bold" style={{ color: '#D4AF37' }}>Student Details</h2>
              <button 
                onClick={() => setShowPopup(false)}
                className="p-1 rounded-full hover:bg-gray-200"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {/* Student info */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F5EFD5' }}>
                    <User size={30} style={{ color: '#D4AF37' }} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-semibold">{selectedStudent.name}</h3>
                    <p className="text-gray-600">{selectedStudent.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar size={18} />
                    Joined: {new Date(selectedStudent.joinDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className={`h-3 w-3 rounded-full ${selectedStudent.active ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    Status: {selectedStudent.active ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>
              
              {/* Enrolled causes */}
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3" style={{ color: '#D4AF37' }}>Enrolled Causes</h4>
                {selectedStudent.enrolledCauses.length > 0 ? (
                  <div className="space-y-3">
                    {selectedStudent.enrolledCauses.map(causeId => (
                      <div 
                        key={causeId} 
                        className="p-3 rounded-lg flex justify-between items-center"
                        style={{ backgroundColor: '#F5EFD5' }}
                      >
                        <span>{getCauseName(causeId)}</span>
                        <span className="text-sm">{selectedStudent.completedLessons} lessons completed</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Not enrolled in any causes.</p>
                )}
              </div>
              
              {/* Payment history */}
              <div>
                <h4 className="text-lg font-medium mb-3" style={{ color: '#D4AF37' }}>Payment History</h4>
                {selectedStudent.payments.length > 0 ? (
                  <div className="overflow-x-auto border rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead style={{ backgroundColor: '#F5EFD5' }}>
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Amount</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Cause</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedStudent.payments.map((payment) => (
                          <tr key={payment.id}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                              {new Date(payment.date).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              <div className="flex items-center gap-1">
                                <CreditCard size={16} style={{ color: '#D4AF37' }} />
                                <span>${payment.amount}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                              {getCauseName(payment.causeId)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">No payment history available.</p>
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 rounded-lg text-white"
                style={{ 
                  backgroundColor: '#D4AF37', 
                  transition: 'background-color 0.3s' 
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#B8860B'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#D4AF37'}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}