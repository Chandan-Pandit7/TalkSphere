import React, { useEffect, useState } from 'react'
import { chatStore } from '../store/chatStore.js';
import SideBarSkeleton from './skeletons/SideBarSkeleton.jsx'
import { Users } from 'lucide-react';
import { authStore } from '../store/authStore.js';

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } = chatStore();
    
	const { onlineUsers } = authStore();
	const [showOnlineOnly, setShowOnlineOnly] = useState(false);


    useEffect(() => {
        getUsers();
        // console.log(users);
    }, [getUsers]);

	const filteredUsers = showOnlineOnly ? users.filter((user) => (onlineUsers.includes(user._id))) : users;

	// console.log(filteredUsers);
    if(isUserLoading) return <SideBarSkeleton/>


  return (
		<aside
			className={`h-full w-full md:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200 ${
		selectedUser ? "hidden lg:flex" : ""
    } `}
		>
			<div className="border-b border-base-300 w-full p-5 ">
				<div className="flex items-center gap-2">
					<Users className="size-6" />
					<span className="font-medium block ">Contacts</span>
				</div>
				{/* Online Filter toggle */}
				<div className="mt-3  flex items-center gap-2">
					<label className="cursor-pointer flex items-center gap-2 ">
						<input
							type="checkbox"
							checked={showOnlineOnly}
							onChange={(e) =>
								setShowOnlineOnly(e.target.checked)
							}
							className="checkbox checkbox-primary size-4 md:size-6 md:checkbox-sm"
						/>
						<span className="text-xs md:text-sm">
							Show online only
						</span>
					</label>
					<span className="text-xs md:text-sm">
						({onlineUsers.length} online)
					</span>
				</div>
			</div>

			<div
				className="overflow-y-auto w-full py-3 no-scrollbar "
			>
				{filteredUsers.map((user) => (
					<button
						key={user._id}
						onClick={() => setSelectedUser(user)}
						className={`
                        flex w-full p-3 items-center gap-3 hover:bg-base-300 transition-colors
                        ${
						selectedUser?._id === user._id
							? "bg-base-300 ring-1 ring-base-300"
							: ""
					}
                        `}
					>
						<div className="md:relative md:mx-auto lg:mx-0 ">
							<img
								src={user.profilePic || "/avatar.png"}
								alt={user.name}
								// alt={user.name.charAt(0).toUpperCase() + user.name.slice(1)}
								className="size-12 rounded-full object-cover"
							/>
							{onlineUsers.includes(user._id) && (
								<span
									className="absolute top-0 right-0 size-3 bg-green-500 rounded-full
                                ring-2 ring-zinc-900 "
								/>
							)}
						</div>

						{/* User info - only visible on larger screen */}

						<div className=" lg:block text-left min-w-0">
							<div className="font-medium truncate">
								{user.name.charAt(0).toUpperCase()+user.name.slice(1)}
							</div>
							<div
								className={`text-sm text-zinc-400 ${
									onlineUsers.includes(user._id)
										? "text-green-500"
										: ""
								} `}
							>
								{onlineUsers.includes(user._id)
									? "Online"
									: "Offline"}
							</div>
						</div>
					</button>
				))}

				{filteredUsers.length === 0 && (
					<div className="text-center text-zinc-500 py-4 ">
						No online users
					</div>
				)}
			</div>
		</aside>
  );
}

export default Sidebar