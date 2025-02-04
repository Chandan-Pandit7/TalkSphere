import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { LockKeyhole,Mail,MessageSquare,EyeClosed,Eye } from 'lucide-react';
import { authStore } from '../store/authStore.js';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword,setShowPassword]=useState(false);
  const[formData,setFormData]=useState({
    email:"",
    password:"",
  })

  const{login,isLoggingIn}=authStore();

  const validateForm=()=>{

    if(!formData.email.trim()){
      toast.error("Email is required",{position:"bottom-left"})
      return false;
    }

    if(!formData.password.trim()){
      toast.error("Password is required",{position:"bottom-left"})
      return false;
    }

    if(formData.password.length<6){
      toast.error("Password should be atleast of 6 characters",{position:"bottom-left"})
      return false;
    }
    return true;

  }

  const handleSubmit=(e)=>{
    e.preventDefault();

    const success=validateForm();
    console.log(success);
    if(success==true) login(formData);
  

  }



  return (
    <div>
      {/* <h1>Login Page</h1> */} 

{/* top part  */}
      <div className="text-center mb-8 mt-20">
            <div className="flex flex-col items-center gap-2 group">
                    <div
                      className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
                                          group-hover:bg-primary/20 transition-colors"
                    >
                      <MessageSquare className="size-6 text-primary" />
                    </div>
      
                    <h1 className="text-2xl font-bold mt-2">
                      <span className="text-primary">Welcome </span>Back !
                     
                    </h1>
                    <p className="text-base-content/60">
                      Sign in to your account.
                    </p>
            </div>
      </div>



{/* form part taking input */}
      <form onSubmit={handleSubmit} class="max-w-sm mx-auto mt-49">

  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      <Mail></Mail>
      Email</label>
    <input type="email" onChange={(e)=>setFormData({...formData,email:e.target.value})}id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='you@example.com'required />
  </div>



  <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      <LockKeyhole/>
      {/* <button
									type="button"
									className="absolute inset-y-0 right-0 flex items-center pr-3"
									onClick={() => {
										setShowPassword(!showPassword);
									}}
								><button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <EyeClosed className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
									{showPassword ? (
										<EyeClosed className="size-5 text-base-content/40" />
									) : (
										<Eye className="size-5 text-base-content/40" />
									)}
			</button> */}
      Password</label>

      
    <input type={showPassword?"text":"password"} onChange={(e)=>setFormData({...formData,password:e.target.value})} id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='*******'required />
    
  </div>




  <div class="flex items-start mb-5">
    <div class="flex items-center h-5">
      <input id="terms" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
    </div>
    <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
  </div>



  <button type="submit" disabled={isLoggingIn} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full">Login</button>
      </form>


{/* Lower part  */}
      <div className="text-center mt-6">
						<p className="text-base-content/60">
							Don't have an account ?{" "}
							<Link
								to="/signup"
								className="link link-primary underline"
							>
								 Create Account
							</Link>
						</p>
			</div>

    </div>
  )
}



export default LoginPage