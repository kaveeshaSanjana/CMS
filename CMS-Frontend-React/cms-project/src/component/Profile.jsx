import React, { useState, useEffect } from 'react';
import { User, Camera, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

const UserRole = {
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN'
};

const GoldButton = ({ children, onClick, isLoading, secondary = false }) => {
  const primaryStyle = {
    backgroundColor: '#D4AF37',
    transition: 'background-color 0.3s'
  };
  
  if (secondary) {
    return (
      <button
        onClick={onClick}
        className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        disabled={isLoading}
      >
        {children}
      </button>
    );
  }
  
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white"
      style={primaryStyle}
      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#B8860B' }}
      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#D4AF37' }}
      disabled={isLoading}
    >
      {children}
    </button>
  );
};

const ProfileHeader = ({ isEditing, setIsEditing, handleSaveProfile, isLoading }) => {
  return (
    <div className="px-4 py-5 sm:px-6 flex justify-between items-center" style={{ backgroundColor: '#F5EFD5' }}>
      <h3 className="text-lg leading-6 font-medium" style={{ color: '#D4AF37' }}>Profile Information</h3>
      {!isEditing ? (
        <GoldButton onClick={() => setIsEditing(true)}>
          Edit Profile
        </GoldButton>
      ) : (
        <div className="flex space-x-2">
          <GoldButton 
            onClick={() => setIsEditing(false)} 
            secondary={true}
          >
            Cancel
          </GoldButton>
          <GoldButton 
            onClick={handleSaveProfile}
            isLoading={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </GoldButton>
        </div>
      )}
    </div>
  );
};

const ProfileImage = ({ profileImage, isEditing, handleImageUpload }) => {
  return (
    <div className="flex flex-col items-center mb-4 md:mb-0 md:mr-6">
      <div className="relative">
        <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100">
          {profileImage ? (
            <img 
              src={profileImage} 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <User className="h-16 w-16 text-gray-300" />
            </div>
          )}
        </div>
        
        {isEditing && (
          <div className="absolute bottom-0 right-0">
            <label htmlFor="profile-image-upload" className="cursor-pointer rounded-full bg-white p-1 shadow-md" style={{ border: '2px solid #D4AF37' }}>
              <Camera className="h-5 w-5" style={{ color: '#D4AF37' }} />
              <input 
                id="profile-image-upload" 
                type="file" 
                accept="image/*"
                className="sr-only"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        )}
      </div>
      
      {isEditing && (
        <p className="mt-2 text-xs text-gray-500">Click the camera icon to upload a new profile image</p>
      )}
    </div>
  );
};

const ProfileDetails = ({ teacherData, isEditing, editData, setEditData }) => {
  return (
    <div className="flex-1">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Full name</dt>
          <dd className="mt-1 text-sm text-gray-900">
            {isEditing ? (
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                required
              />
            ) : (
              teacherData.name
            )}
          </dd>
        </div>
        
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Username</dt>
          <dd className="mt-1 text-sm text-gray-900">{teacherData.username}</dd>
        </div>
        
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Email address</dt>
          <dd className="mt-1 text-sm text-gray-900">{teacherData.email}</dd>
        </div>
        
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Role</dt>
          <dd className="mt-1 text-sm text-gray-900">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {teacherData.role}
            </span>
          </dd>
        </div>
      </dl>
    </div>
  );
};

const PasswordField = ({ id, label, value, onChange, showPassword, toggleVisibility, helperText }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          id={id}
          name={id}
          type={showPassword ? "text" : "password"}
          required
          value={value}
          onChange={onChange}
          className="block w-full pr-10 border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <button
            type="button"
            onClick={toggleVisibility}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
    </div>
  );
};

const PasswordChangeForm = ({ 
  passwordData, 
  setPasswordData, 
  showCurrentPassword, 
  setShowCurrentPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  passwordError,
  handleChangePassword,
  isLoading,
  setShowPasswordForm
}) => {
  return (
    <form onSubmit={handleChangePassword}>
      {passwordError && (
        <div className="mb-4 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{passwordError}</h3>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <PasswordField
          id="current-password"
          label="Current Password"
          value={passwordData.currentPassword}
          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
          showPassword={showCurrentPassword}
          toggleVisibility={() => setShowCurrentPassword(!showCurrentPassword)}
        />
        
        <PasswordField
          id="new-password"
          label="New Password"
          value={passwordData.newPassword}
          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
          showPassword={showNewPassword}
          toggleVisibility={() => setShowNewPassword(!showNewPassword)}
          helperText="Password must be at least 8 characters long"
        />
        
        <PasswordField
          id="confirm-password"
          label="Confirm New Password"
          value={passwordData.confirmPassword}
          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
          showPassword={showConfirmPassword}
          toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
        />
        
        <div className="flex justify-end">
          <GoldButton isLoading={isLoading}>
            {isLoading ? 'Changing Password...' : 'Change Password'}
          </GoldButton>
        </div>
      </div>
    </form>
  );
};

// Security Section Component
const SecuritySection = ({ 
  showPasswordForm, 
  setShowPasswordForm, 
  resetPasswordData,
  passwordData,
  setPasswordData,
  showCurrentPassword, 
  setShowCurrentPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  passwordError,
  setPasswordError,
  handleChangePassword,
  isLoading
}) => {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium" style={{ color: '#D4AF37' }}>Security</h3>
        
        {!showPasswordForm ? (
          <GoldButton onClick={() => setShowPasswordForm(true)}>
            Change Password
          </GoldButton>
        ) : (
          <GoldButton
            onClick={() => {
              setShowPasswordForm(false);
              resetPasswordData();
            }}
            secondary={true}
          >
            Cancel
          </GoldButton>
        )}
      </div>
      
      {showPasswordForm && (
        <PasswordChangeForm
          passwordData={passwordData}
          setPasswordData={setPasswordData}
          showCurrentPassword={showCurrentPassword}
          setShowCurrentPassword={setShowCurrentPassword}
          showNewPassword={showNewPassword}
          setShowNewPassword={setShowNewPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          passwordError={passwordError}
          handleChangePassword={handleChangePassword}
          isLoading={isLoading}
          setShowPasswordForm={setShowPasswordForm}
        />
      )}
    </div>
  );
};

// Success Message Component
const SuccessMessage = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="rounded-md bg-green-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <CheckCircle className="h-5 w-5 text-green-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-green-800">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading Component
const LoadingSpinner = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" style={{ color: '#D4AF37' }}></div>
      <p className="ml-2 text-gray-600">{message || 'Loading...'}</p>
    </div>
  );
};

// Error Component
const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-50 p-4 rounded-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{message}</h3>
        </div>
      </div>
    </div>
  );
};

// Main Teacher Profile Page Component
export default function TeacherProfilePage() {
  // Teacher data state
  const [teacherData, setTeacherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    profileImage: ''
  });
  
  // Password change states
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Feedback states
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Reset password form data
  const resetPasswordData = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordError('');
  };
  
  // Fetch teacher data on component mount
  useEffect(() => {
    fetchTeacherData();
  }, []);
  
  // Simulate fetching teacher data from API
  const fetchTeacherData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock teacher data
      const mockTeacher = {
        userID: 101,
        profileImage: '/api/placeholder/150/150',
        name: 'Jane Doe',
        username: 'janedoe',
        email: 'jane.doe@example.com',
        role: UserRole.TEACHER
      };
      
      setTeacherData(mockTeacher);
      setEditData({
        name: mockTeacher.name,
        profileImage: mockTeacher.profileImage
      });
    } catch (err) {
      setError('Failed to fetch profile data. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle editing profile
  const handleSaveProfile = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update teacher data
      const updatedTeacher = {
        ...teacherData,
        name: editData.name,
        profileImage: editData.profileImage
      };
      
      setTeacherData(updatedTeacher);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle password change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setSuccessMessage('');
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset password form
      resetPasswordData();
      setShowPasswordForm(false);
      setSuccessMessage('Password changed successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      setPasswordError('Failed to change password. Please check your current password and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real application, you would upload this file to a server
      // and get back a URL. For this example, we'll simulate that with a placeholder
      setEditData({
        ...editData,
        profileImage: '/api/placeholder/150/150'
      });
    }
  };
  
  if (isLoading && !teacherData) {
    return <LoadingSpinner message="Loading profile..." />;
  }
  
  if (error && !teacherData) {
    return <ErrorMessage message={error} />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900" style={{ color: '#D4AF37' }}>Teacher Profile</h1>
        </div>
      </div>
      
      {/* Success Message */}
      <SuccessMessage message={successMessage} />
      
      {/* Main Profile Card */}
      <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden rounded-lg">
          {/* Profile Header */}
          <ProfileHeader 
            isEditing={isEditing} 
            setIsEditing={setIsEditing} 
            handleSaveProfile={handleSaveProfile}
            isLoading={isLoading}
          />
          
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex flex-col md:flex-row">
                {/* Profile Image */}
                <ProfileImage 
                  profileImage={teacherData.profileImage}
                  isEditing={isEditing}
                  handleImageUpload={handleImageUpload}
                />
                
                {/* Profile Details */}
                <ProfileDetails 
                  teacherData={teacherData}
                  isEditing={isEditing}
                  editData={editData}
                  setEditData={setEditData}
                />
              </div>
              
              {/* Change Password Section */}
              <SecuritySection 
                showPasswordForm={showPasswordForm}
                setShowPasswordForm={setShowPasswordForm}
                resetPasswordData={resetPasswordData}
                passwordData={passwordData}
                setPasswordData={setPasswordData}
                showCurrentPassword={showCurrentPassword}
                setShowCurrentPassword={setShowCurrentPassword}
                showNewPassword={showNewPassword}
                setShowNewPassword={setShowNewPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
                passwordError={passwordError}
                setPasswordError={setPasswordError}
                handleChangePassword={handleChangePassword}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}