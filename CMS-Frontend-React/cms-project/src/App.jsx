import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './component/footer/Footer'
import Login from './pages/common/Login'
import RegisterPage from './pages/common/Register'
import AllCausesPage from './pages/common/AllCausesPage'
import CourseCreator from './pages/teacher/CauseCreatePage'
import CertificateEditor from './pages/teacher/CreateCertificate'
import CauseDetailsPage from './pages/CauseDetails'
import ContactUs from './pages/common/ContactUs'
import CauseCartPage from './pages/CauseCart'
import TeacherPage from './pages/teacher/TeacherPages'
import ProfilePage from './component/profile'
import CauseManagementPage from './component/TeacherCauseManagement'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/common/Login'
import LandingPage from './pages/LadingPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="" element={<LandingPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/contact" element={<ContactUs />}/>

        <Route path='/causes' element={<AllCausesPage />}/>
        <Route path='/cause/:id' element={<CauseDetailsPage />}/>
        

        <Route path='/teacher-dash' element={<TeacherPage />}/>
        
        </Routes>
    </Router>
  )
}

export default App
