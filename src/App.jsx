
import './App.css'
import Navbar from './component/Navbar'
import Home from './component/Home'
import RegistrationPage from './component/RegistrationPage'
import About from './component/About'
import { Routes, Route } from 'react-router-dom'
import StudentRegistration from './component/Registration/StudentRegistration'
import FacultyRegistration from './component/Registration/FacultyRegistration'
import AdminstrationRegistration from './component/Registration/AdminstrationRegistration'
import Footer from './component/Footer'
import StudentLogin from './component/Login/StudentLogin'
import FacultyLogin from './component/Login/FacultyLogin'
import HodLogin from './component/Login/HodLogin'
import FacultyLoginPage from './component/Login/FacultyLoginPage'
import QuestionSuggestion from './component/Suggestion/QuestionSuggestion'
import StudentHomePage from './component/StudentSection/StudentHomePage'
import FacultyHome from './component/FacultySection/FacultyHome'
import HODHome from './component/FacultySection/HODHome'
import AdminLogin from './component/Login/AdminLogin'


function App() {


  return (
    <>

      {/* <div className="container"> */}
      <Navbar />
      {/* <h1>Welcome to College Portal</h1> */}

      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/RegistrationPage' element={<RegistrationPage />} />
          <Route path='/Registration/StudentRegistration' element={<StudentRegistration />} />
          <Route path='/Registration/FacultyRegistration' element={<FacultyRegistration />} />
          <Route path='/Registration/AdminstrationRegistration' element={<AdminstrationRegistration />} />
          <Route path='/Login/StudentLogin' element={<StudentLogin />} />
          <Route path='/Login/FacultyLoginPage' element={<FacultyLoginPage />} />
          <Route path='/Login/HodLogin' element={<HodLogin />} />
          <Route path='/Login/FacultyLogin' element={<FacultyLogin />} />
          <Route path='/Login/AdminLogin' element={<AdminLogin />} />
          <Route path='/Suggestion/QuestionSuggestion' element={<QuestionSuggestion/>}/>
          <Route path='/Login/StudentSection/StudentHomePage' element={<StudentHomePage />} />        {/* <Route path='/Suggestion/QuestionSuggestion' element={<QuestionSuggestion/>}/> */}
          <Route path='/Login/FacultySection/FacultyHome' element={<FacultyHome />} />
          <Route path='/Login/FacultySection/HODHome' element={<HODHome />} />
          
         


        </Routes>



      </div>
      <Footer />


      {/* </div> */}


    </>
  )
}

export default App
