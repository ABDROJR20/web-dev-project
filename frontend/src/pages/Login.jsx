import React, { useState } from 'react'
import axios from 'axios'
import { Link , useNavigate} from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../constants/Constants';

const Login = () => {
    // const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const navigate = useNavigate()
    const {login} = useAuth();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${API_BASE_URL}auth/login`,
                { email, password } 
            );
            if(response.data.success){
                login(response.data.user)
                localStorage.setItem("token", response.data.token);
                toast.success("Logged In Succesfully")
                navigate('/')
            }
            console.log(response)
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
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-2xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path></svg>
        </div>
        <h2 className="text-3xl font-black tracking-tight text-gray-900">
          Welcome back
        </h2>
        <p className="text-gray-500 font-medium mt-2">Log in to access your workspace</p>
      </div>

      <form onSubmit={handleSubmit}>

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
            Sign In
          </button>

          <p className="text-center text-sm font-medium text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-bold transition-colors duration-200">
              Register here
            </Link>
          </p>
        </div>

      </form>
    </div>
  </div>
)
}

export default Login