import { useState } from 'react'
import Navbar from './components/Navbar'
import Background from './components/Background'
import Food_catogories from './components/Food_catogories'
import './App.css'
import Menu from './components/Menu'
import Login from './Pages/Auth/Login'
import Sign_up from './Pages/auth/Sign_up'
import Mail from './components/Mail'
import App_footer from './components/App_footer'
import Testimonials from './components/Testimonials'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/public/Home'
import Booktable from './Pages/public/Booktable'
import Contact from './Pages/public/Contact'
import Cart from './components/Cart'
import Profile from './components/Profile'

function App() {

  // 👇 GLOBAL CART STATE
  const [cartCount, setCartCount] = useState(0);

  return (
    <>
      <BrowserRouter>

        {/* Pass cartCount to Navbar */}
        <Navbar cartCount={cartCount} />

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Sign_up />} />
          <Route path='/' element={<Home />} />
          <Route path='/booktable' element={<Booktable />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/profile' element={<Profile />} />


          {/* Pass cart props to Menu */}
          <Route
            path='/menu'
            element={<Menu cartCount={cartCount} setCartCount={setCartCount} />}
          />

          <Route path='/cart' element={<Cart />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
