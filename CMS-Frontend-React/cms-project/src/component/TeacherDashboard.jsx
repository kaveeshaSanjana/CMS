// Dashboard.jsx
import { useState } from 'react';
import { Heart, Users, Video, MessageCircle, Search, ChevronDown, ChevronUp } from 'lucide-react';

// Summary Card Component
function SummaryCard({ title, value, icon }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#F5EFD5', color: '#D4AF37' }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

// Event Card Component
function EventCard({ title, date, attendees }) {
  return (
    <div className="border-b pb-4 last:border-b-0 last:pb-0">
      <h3 className="font-medium">{title}</h3>
      <div className="flex justify-between text-sm mt-2">
        <span className="text-gray-500">{date}</span>
        <span className="font-medium rounded-full px-2 py-1 text-xs" style={{ backgroundColor: '#F5EFD5', color: '#B8860B' }}>
          {attendees} attendees
        </span>
      </div>
    </div>
  );
}

export default function Dashboard({ causes }) {
  const [expandedCause, setExpandedCause] = useState(null);

  // Toggle cause details expansion
  const toggleCauseDetails = (id) => {
    if (expandedCause === id) {
      setExpandedCause(null);
    } else {
      setExpandedCause(id);
    }
  };

  return (
    <>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard title="Total Causes" value="14" icon={<Heart />} />
        <SummaryCard title="Active Students" value="135" icon={<Users />} />
        <SummaryCard title="Tutorial Videos" value="47" icon={<Video />} />
        <SummaryCard title="New Messages" value="8" icon={<MessageCircle />} />
      </div>

      {/* Progress Section */}
      <h2 className="text-xl font-semibold mb-4" style={{ color: '#B8860B' }}>Cause Progress</h2>
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="space-y-4">
          {causes.map(cause => (
            <div key={cause.id} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{cause.title}</h3>
                <span className="text-sm font-medium">{cause.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="h-2.5 rounded-full" 
                  style={{ 
                    width: `${cause.progress}%`,
                    backgroundColor: '#D4AF37'
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#B8860B' }}>Active Causes</h2>
          <div className="bg-white rounded-lg shadow-md">
            {causes.map((cause) => (
              <div key={cause.id} className="border-b last:border-b-0">
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleCauseDetails(cause.id)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{cause.title}</h3>
                    <button className="text-gray-500">
                      {expandedCause === cause.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Users size={14} className="mr-1" />
                    <span>{cause.students} students</span>
                  </div>
                  {expandedCause === cause.id && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-gray-600 mb-2">{cause.description}</p>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium rounded-full px-2 py-1 bg-gray-100">
                          {cause.progress}% complete
                        </span>
                        <span className="text-sm text-gray-500">{cause.recentActivity}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#B8860B' }}>Upcoming Events</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="space-y-4">
              <EventCard 
                title="Volunteer Training Session" 
                date="Tomorrow, 3:00 PM" 
                attendees={12} 
              />
              <EventCard 
                title="Weekly Progress Meeting" 
                date="April 25, 10:00 AM" 
                attendees={8} 
              />
              <EventCard 
                title="New Cause Introduction" 
                date="April 30, 2:00 PM" 
                attendees={24} 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}