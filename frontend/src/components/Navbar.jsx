import React from 'react'
import { authStore } from '../store/authStore.js'
import { Link } from 'react-router-dom';
import { MessageSquare,Settings,LogOutIcon} from 'lucide-react';

function Navbar() {
  const {logout,authUser}=authStore();
//   if(authUser){
// 	console.log(authUser);
//     console.log(authUser.user);
//     console.log(authUser.user.name);
//     console.log(authUser.user.profilePic);

//   }


  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
			<div className="container mx-auto px-4 h-16">
				<div className="flex items-center justify-between h-full">
					<div className="flex items-center gap-8">
						<Link
							to="/"
							className="flex items-center gap-2.5 hover:opacity-80 transition-all"
						>
							<div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center ">
								<MessageSquare className="size-5 text-primary" />
							</div>
							<h1 className="text-lg font-bold">Chat App</h1>
						</Link>
					</div>

					<div className="flex items-center gap-3">
						<Link
							to={"/settings"}
							className={`btn btn-sm gap-2 transition-colors`}
						>
							<Settings className="size-4" />
							<span className="hidden sm:inline ">
								{" "}
								Settings
							</span>
						</Link>


            

						{authUser && (
							<>
								<Link
									to={"/profile"}
									className={`btn btn-sm gap-2`}
								>
									{/* <User2 className="size-5" /> */}
									<img
										src={
											authUser.user?.profilePic ||
											"/avatar.png"
										}
										alt="profile"
										className="size-5 rounded-full object-cover"
									/>
									<span className="hidden sm:inline">
										Profile
									</span>
								</Link>
								{/* Hello {authUser.name} */}
								<span>Hello {authUser.user.name.toUpperCase()}</span>
								{/* <span>Hello {authUser.name.charAt(0).toUpperCase() + authUser.name.slice(1)}</span> */}
								
								

								<button
									className="flex gap-2 items-center"
									onClick={logout}
								>
									<LogOutIcon className="size-5" />
									<span className="hidden sm:inline">
										Logout
									</span>
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</header>
    
  )
}

export default Navbar