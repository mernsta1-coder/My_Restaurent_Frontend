import React from 'react'
import logo from '../images/restaurent.jpg'
import { useNavigate } from 'react-router-dom'



const Background = () => {
  const navigate = useNavigate();
  return (
    <div className=' mt-16 w-full h-127  bg-cover bg-center text-center opacity-90 ' 
  style={{ backgroundImage: `url(${logo})` }}>
    <h1 className='text-white font-bold text-5xl pt-25'> Welcome to our Restaurant</h1>
    <h2 className='text-white text-3xl '>Enjoy the best food in town</h2>
    <input type="button" value="all Menu" onClick={() => navigate("/menu")} className='mt-10 bg-red-600 w-32 cursor-pointer h-10 rounded-b-sm
     text-white text-xl  rounded-lg'/>
     <input type="button" value="Book Table" onClick={() => navigate("/booktable")} className='mt-10  cursor-pointer w-32 h-10 rounded-b-sm
     text-white text-xl ' />

    </div>
  )
}

export default Background