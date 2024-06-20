import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Registration from "./Component/Registration"
import Signin from './Component/Signin'
// import Nav from './Component/Nav'
import Home from './Component/Home/Home'
import Navbar from './Component/Navbar/Navbar'
import Products from './Component/Products'
import Product1 from './Component/Product1'
import Notfound from './Component/Notfound'
import Dashboard from './Component/Dashboard'
import User from './Component/Userbutton/User'
import Userdisplay from './Component/Userbutton/Userdisplay'
import MUI from './Component/MUI/MUI'





function App() {
 
  const authToken = localStorage.getItem('token')

  return (
    <>
   
{/* <Nav/> */}
    <Routes>
      <Route path="/" element={<Navbar/>}>

        <Route exact path='/' element={<Home/>}/>
        <Route path='/signup' element={<Registration/>}/>
        <Route path='/signin' element={<Signin/>}/>
      
        <Route path='/Products' element={<Products/>}>
          <Route path='/Products/Product1' element={<Product1/>}/>
        </Route>

      </Route>

      <Route path='*' element={<Notfound/>}/>
      <Route path='/dashboard' element={authToken? <Dashboard/>: <Signin/>}/>
      

      <Route path='/users' element={<User/>}/>
      <Route path='/users/user/:username' element={<Userdisplay/>}/>
      <Route path='/mui' element={<MUI/>}/>
    </Routes>
      
    </>
  )
}

export default App
