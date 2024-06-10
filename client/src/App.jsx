import { useState } from 'react'
import { AuthProvider } from './compont/Function/AuthContext'
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom'

import Navbar from './compont/navbar'
import Footer from './compont/Footer'
import AddBook from './compont/Form/AddBook'
import HomePage from './compont/home'
import Books from './compont/pages/Books'
import LoginPage from './compont/Form/login'
import SignupPage from './compont/Form/signup'
import UserProfile from './compont/pages/profile'
import ServerError from './compont/pages/serverError'
import BorrowBook from './compont/pages/Borrow'
import Unauthorized from './compont/pages/unauthorized'
import AdminRoute from './compont/Function/IsAdmin'

function App() {

  return (
   <AuthProvider>
    <Navbar/>
     <Routes>
      <Route path='/' element={<HomePage/>}/>
     <Route path='/add-book' element={
      <AdminRoute>
        <AddBook/>
      </AdminRoute>
     }/>
     <Route path='/books' element={<Books/>}/>
     <Route path='/login' element={<LoginPage/>}/>
     <Route path='/signup' element={<SignupPage/>}/>
     <Route path='/user' element={<UserProfile/>}/>
     <Route Path='/borrow/book' element={<BorrowBook/>}/>
     <Route path='/500' element={<ServerError/>}/>
     <Route path='/unauthorized' element={<Unauthorized/>}/>

     </Routes>
     <Footer/>
   </AuthProvider>
  )
}

export default App
