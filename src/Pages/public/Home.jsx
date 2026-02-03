import React from 'react'
import Background from '../../components/Background'
import Food_catogories from '../../components/Food_catogories'
import Menu from '../../components/Menu'
import Mail from '../../components/Mail'
import Testimonials from '../../components/Testimonials'
import App_footer from '../../components/App_footer'

const Home = () => {

  return (<>
    <div>
        <Background/>
     <Food_catogories/>
     <Menu />
     
    <Mail />
    <Testimonials />
    <App_footer />
    </div>
    </>
  )
}

export default Home