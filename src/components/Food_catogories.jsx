import React from 'react'
import burger from '../images/burger.jpg'
import fries from '../images/Fries.jpg'
import garlic_bread from '../images/garlic_bread.jpg'
import non_veg_pizza from '../images/non_veg_pizza.jpg'
import veg_pizza from '../images/veg_pizza.jpg'
import drinks from '../images/drinks.jpg'


const Food_catogories = () => {
    const categories = [
        {
            id:1,
            name:"Pizza",
            img:veg_pizza
        },
        {
            id:2,
            name:"Non-Veg Pizza",
            img:non_veg_pizza
        },
        {
            id:3,
            name:"Burger",
            img:burger
        },{
            id:4,
            name:"Fries",
            img:fries
        },{
            id:5,
            name:"Garlic Bread",
            img:garlic_bread
        },{
            id:6,
            name:"Stuffed Mushroom",
            img:garlic_bread
        
        },
        {
            id:7,
            name:"drinks",
            img:drinks
        }
    ];
  return (<>
    <h1 className=' text-center text-5xl mt-3'>
        Explore our <span className='text-yellow-300'>Categories </span>
        </h1>
        <p className='text-center mt-5'>Discover delicious dishes from our carefully curated categories</p>
        <div className=' grid grid-cols-4 justify-around mt-10'>
            {categories.map((category)=>(
            
            <div key={category.id} className='items-center text-center '>
              
                <img src={category.img} alt={category.name}  className='min-h-30 w-30 rounded-full mx-auto'/>
            
                <h2 className='text-sm mt-2 mb-5'>{category.name}</h2>

            </div>
        
            
        ))}
        </div>
        </>
  )
}

export default Food_catogories