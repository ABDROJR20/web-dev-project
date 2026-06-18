import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { API_BASE_URL } from '../constants/Constants'

const Signup = () => {
    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${API_BASE_URL}auth/register`,
                { name, email, password } 
            );
            if(response.data.success){
                toast.success("Account Created Successfully")
                navigate('/login')
            }
        } catch(error){
            console.log(error)
        }
    }

  return (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-cyan-50/50 px-4 sm:px-6 font-sans antialiased text-gray-900">
    <div className="w-full max-w-md bg-white/60 backdrop-blur-2xl rounded-[2.5rem] border border-white p-8 sm:p-10 shadow-2xl shadow-indigo-100/50 transition-all duration-300 ease-in-out relative overflow-hidden">
      
      {/* Decorative background blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-200/50 to-purple-200/50 blur-[40px] rounded-full -z-10 pointer-events-none"></div>

      {/* Sleek, Modern Minimalist Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/30 text-white">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-2xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
        </div>
        <h2 className="text-3xl font-black tracking-tight text-gray-900">
          Create Account
        </h2>
        <p className="text-gray-500 font-medium mt-2">Start organizing your life today</p>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Username Field Wrapper */}
        <div className="mb-5">
          <label className="block text-gray-700 font-bold text-sm mb-2 transition-colors duration-200">
            Full Name
          </label>
          <input 
            placeholder="John Doe" 
            required 
            type="text" 
            className="w-full px-4 py-3.5 bg-white border-2 border-transparent focus:border-indigo-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 shadow-[0_2px_10px_rgb(0,0,0,0.02)]" 
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email Field Wrapper */}
        <div className="mb-5">
          <label className="block text-gray-700 font-bold text-sm mb-2 transition-colors duration-200">
            Email Address
          </label>
          <input 
            className="w-full px-4 py-3.5 bg-white border-2 border-transparent focus:border-indigo-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 shadow-[0_2px_10px_rgb(0,0,0,0.02)]" 
            placeholder="name@example.com" 
            required 
            type="email" 
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field Wrapper */}
        <div className="mb-8">
          <label className="block text-gray-700 font-bold text-sm mb-2 transition-colors duration-200">
            Password
          </label>
          <input 
            className="w-full px-4 py-3.5 bg-white border-2 border-transparent focus:border-indigo-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 shadow-[0_2px_10px_rgb(0,0,0,0.02)]" 
            placeholder="••••••••" 
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        {/* Actions Section */}
        <div className="space-y-6">
          <button 
            type="submit" 
            className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 px-4 rounded-2xl shadow-xl shadow-gray-900/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 focus:outline-none"
          >
            Create Account
          </button>

          <p className="text-center text-sm font-medium text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-bold transition-colors duration-200">
              Log in here
            </Link>
          </p>
        </div>

      </form>
    </div>
  </div>
)
}

export default Signup