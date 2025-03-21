import React, { useState } from 'react'
import restoraount from "../assets/images/restaurant-img.jpg"
import logo from "./../assets/images/logo.png";
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';

const Auth = () => {

  const [isRegister, setRegister]=useState(false);

  return (
    <div className='flex min-h-screen  '>
      {/**Left */}
      <div className='w-1/2 relative flex items-center justify-center bg-cover'>
        {/**BG iMAGE */}
        <img className=' w-full  h-full object-cover' src={restoraount} alt="pzoadina" />
        {/*Black Overlay */}
        <div className="absolute inset-0  bg-opacity-80">

        {/**Qoute */}

        <blockquote className="  absolute bottom-10 px-8 mb-10 text-2xl italic text-white">
          "Serve customers the best food with prompt and friendly service in a welcoming atmosphere, and they'll keep coming back."
          <br />
          <span className="block mt-4 text-yellow-400">- Founder of Restroc</span>
        </blockquote>
</div>
      </div>
      {/**Right deo */}
      <div className='w-1/2 min-h-screen bg-gray-900 p-10'>
      <div className='flex flex-col items-center '>
       <img src={logo} alt="logo" className=' h-25 border-2 rounded-full p-1'  /> 
      </div>
      <h2 className='text-4xl text-center mt-10 font-semibold text-yellow-400 mb-10'>{isRegister  ? "Employee Registration": "Employee Login"}</h2>
    {/**Delovi */}
    {isRegister? <Register setRegister={setRegister}/> : <Login/>}
    <div className='flex justify-center mt-6 gap-1'>
      <p className='mt-6.1text-sm text-gray-200'>{isRegister? "Already have an account?" : "Don't have an account?"}</p>
      <a onClick={()=>setRegister(!isRegister)} href="#" className='text-yellow-400 font-semibold hover:underline'>{isRegister? "Sing In":"Sing Up"}</a>
    </div>
      </div>
    </div>
  )
}

export default Auth;