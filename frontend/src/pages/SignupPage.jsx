import React, { useState } from 'react'
import { authStore } from '../store/authStore'
import {toast} from "react-hot-toast"
// import { Link } from 'lucide-react'
import { Link } from 'react-router-dom'
import {User2,Mail, LockKeyhole,MessageSquare} from "lucide-react"

const SignupPage = () => {
  const [showPassword,setShowPassword]=useState(false)
  const [formData,setFormData]=useState({
    email:'',
    password:'',
    name:''
  })

  const { signup,isSigningUp } = authStore();

  const validateForm=()=>{
    if(!formData.name.trim()){
      toast.error("Name is required")
      return false
    }
    if(!formData.email.trim()){
      toast.error("Email is required")
      return false
    }
    if(!formData.password.trim()){
      toast.error("Password is required")
      return false
    }
    if(formData.password.length<6){
      toast.error("Password should be at least 6 characters")
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    // console.log(success);
    // toast.success("button clicked successfully");
    if(success) signup(formData);
  }


  return (
    <div>
        {/* <h1 className='text-2xl align-middle'>Signup Page</h1> */}

      <div className="text-center mb-8 mt-20">
					<div className="flex flex-col items-center gap-2 group">
							<div
								className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
                                    group-hover:bg-primary/20 transition-colors"
							>
								<MessageSquare className="size-6 text-primary" />
							</div>

							<h1 className="text-2xl font-bold mt-2">
								Create Account
							</h1>
							<p className="text-base-content/60">
								Get started with your free account
							</p>
					</div>
			</div>   


        <form onSubmit={handleSubmit} class="max-w-sm mx-auto ">
  <div class="mb-5">
    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      <User2/>
      Name</label>
    <input type="name" onChange={(e)=>setFormData({...formData,name:e.target.value})}id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="John Doe" required />
  </div>





  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      <Mail></Mail>
      Email</label>
    <input type="email" onChange={(e)=>setFormData({...formData,email:e.target.value})}id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='you@example.com'required />
  </div>





  <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      <LockKeyhole/>
      Password</label>
    <input type="password" onChange={(e)=>setFormData({...formData,password:e.target.value})}id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='*******'required />
  </div>




  <div class="flex items-start mb-5">
    <div class="flex items-center h-5">
      <input id="terms" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
    </div>
    <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
  </div>



         <button type="submit" disabled={isSigningUp} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full">Create new account</button>
        </form>


        <div className="text-center mt-6">
						<p className="text-base-content/60">
							Already have an account ?{" "}
							<Link
								to="/login"
								className="link link-primary underline"
							>
								Login
							</Link>
						</p>
				</div>



       
	  </div>
		
  )
}

export default SignupPage