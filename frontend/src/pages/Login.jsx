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
  <div className="flex justify-center items-center min-h-screen bg-[#f9f9fb] px-4 sm:px-6 font-sans antialiased text-slate-800">
    <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 ease-in-out">
      
      {/* Sleek, Modern Minimalist Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-rose-600 to-rose-700 bg-clip-text text-transparent uppercase">
          LOGIN
        </h2>
        <div className="h-[3px] w-12 bg-rose-600 mx-auto mt-2 rounded-full" />
      </div>

      <form onSubmit={handleSubmit}>

        {/* <div className="mb-4">
            <label className="block text-teal-700 font-semibold mb-1">Name</label>
            <input 
            placeholder='Enter Username' 
            required 
            type="text" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" 
            onChange={(e) => setName(e.target.value)}/>
        </div> */}

        {/* Email Field Wrapper */}
        <div className="mb-5">
          <label className="block text-slate-600 font-medium text-sm mb-1.5 transition-colors duration-200">
            Email Address
          </label>
          <input 
            className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all duration-200" 
            placeholder="name@example.com" 
            required 
            type="email" 
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field Wrapper */}
        <div className="mb-6">
          <label className="block text-slate-600 font-medium text-sm mb-1.5 transition-colors duration-200">
            Password
          </label>
          <input 
            className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all duration-200" 
            placeholder="••••••••" 
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        {/* Actions Section */}
        <div className="space-y-5">
          <button 
            type="submit" 
            className="w-full bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-medium py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-rose-500/20"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-rose-600 hover:text-rose-700 font-semibold transition-colors duration-200">
              Register
            </Link>
          </p>
        </div>

      </form>
    </div>
  </div>
)
}

export default Login