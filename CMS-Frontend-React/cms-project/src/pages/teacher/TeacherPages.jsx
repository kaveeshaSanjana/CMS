// TeacherPage.jsx
import { useState, useEffect } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import NavigationBar from '../../component/TeacherSideNavBar';
import Dashboard from '../../component/TeacherDashboard';
import MessagesComponent from '../../component/Message';
import TeacherViewStudent from '../../component/TeachcerViewStudent';
import TeacherProfilePage from '../../component/profile';
import CauseManagementPage from '../../component/TeacherCauseManagement';

export default function TeacherPage() {
    // State management
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [causes, setCauses] = useState([]);
    const [activeSection, setActiveSection] = useState('dashboard');

    // Simulated API call to fetch causes
    useEffect(() => {
        const fetchCauses = async () => {
            setIsLoading(true);
            try {
                // Simulating API delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Mock data
                const causesData = [
                    {
                        id: 1,
                        title: 'Clean Water Initiative',
                        progress: 75,
                        students: 42,
                        description: 'Providing clean water solutions to communities in need.',
                        recentActivity: '3 new students joined today'
                    },
                    {
                        id: 2,
                        title: 'Food Security Program',
                        progress: 45,
                        students: 28,
                        description: 'Working to ensure consistent access to nutritious food.',
                        recentActivity: 'Added new video resources'
                    },
                    {
                        id: 3,
                        title: 'Education for All',
                        progress: 90,
                        students: 65,
                        description: 'Supporting educational initiatives in underprivileged areas.',
                        recentActivity: '12 students completed all modules'
                    },
                ];

                setCauses(causesData);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to load causes. Please try again later.');
                setIsLoading(false);
            }
        };

        fetchCauses();
    }, []);

    // Render loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-screen" style={{ backgroundColor: '#F5EFD5' }}>
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-t-4 rounded-full animate-spin mb-4 mx-auto"
                        style={{ borderColor: '#D4AF37', borderTopColor: 'transparent' }}></div>
                    <p className="text-lg font-semibold" style={{ color: '#B8860B' }}>Loading dashboard...</p>
                </div>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="flex items-center justify-center w-full h-screen" style={{ backgroundColor: '#F5EFD5' }}>
                <div className="text-center p-8 rounded-lg bg-white shadow-lg max-w-md">
                    <AlertCircle size={48} className="mx-auto mb-4" style={{ color: '#D4AF37' }} />
                    <h2 className="text-xl font-bold mb-2" style={{ color: '#B8860B' }}>Error</h2>
                    <p className="mb-4">{error}</p>
                    <button
                        className="px-4 py-2 rounded-md text-white transition-colors duration-200"
                        style={{ backgroundColor: '#D4AF37', hover: { backgroundColor: '#B8860B' } }}
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Navigation Component */}
            <NavigationBar activeSection={activeSection} setActiveSection={setActiveSection} />

            {/* Main Content */}
            <div className="flex-1 pt-16 md:pt-0">
                {/* Content Header */}
                <header className="p-4 md:p-6 border-b shadow-sm" style={{ backgroundColor: '#F5EFD5' }}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <h1 className="text-2xl font-bold mb-4 md:mb-0" style={{ color: '#B8860B' }}>
                            {activeSection === 'dashboard' && 'Dashboard Overview'}
                            {activeSection === 'causes' && 'Active Causes'}
                            {activeSection === 'tutorials' && 'Tutorial Videos'}
                            {activeSection === 'students' && 'Student Management'}
                            {activeSection === 'messages' && 'Message Center'}
                            {activeSection === 'resources' && 'Teaching Resources'}
                        </h1>
                        <div className="relative">
                            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-opacity-50 w-full md:w-64"
                                style={{ borderColor: '#D4AF37', focusRing: '#F5EFD5' }}
                            />
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="p-4 md:p-6">
                    {activeSection === 'dashboard' && (
                        <Dashboard causes={causes} />
                    )}

                    {activeSection === 'causes' && (
                        <CauseManagementPage />
                    )}

                    {activeSection === 'messages' && (
                        <MessagesComponent />
                    )}

                    {activeSection === 'students' && (
                        <TeacherViewStudent />
                    )}

                    {activeSection === 'resources' && (
                        <TeacherProfilePage />
                    )}

                    {activeSection !== 'causes' && activeSection !== 'dashboard' && activeSection !== 'messages' && activeSection !== 'students' && activeSection !== 'resources' && (
                        <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-md">
                            <div className="text-center">
                                <h2 className="text-xl font-semibold mb-2" style={{ color: '#B8860B' }}>
                                    {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section
                                </h2>
                                <p className="text-gray-600">This section is under development</p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}