import { MoveLeft } from "lucide-react";
import { authStore } from "../store/authStore.js";
import { chatStore } from "../store/chatStore.js";
import React from 'react'

const ChatHeader = () => {
    const{selectedUser,setSelectedUser}=chatStore();
    const{onlineUsers}=authStore();
	// console.log(selectedUser);
	// console.log(selectedUser.name);

  return (

    <div className="p-2.5 border-b border-base-300">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					{/* Close button */}
					<button className="ml-2" onClick={() => setSelectedUser(null)}>
						<MoveLeft />
					</button>
					{/* Avatar */}
					<div className="avatar">
						<div className="size-10 rounded-full relative">
							<img
								src={
									selectedUser.profilePic ||
									"/avatar.png"
								}
								alt={selectedUser.name}
							/>
						</div>
					</div>

					{/* User info */}
					<div>
						<h3 className="font-medium">
							{selectedUser.name.charAt(0).toUpperCase()+selectedUser.name.slice(1)}
							
							 {/* {selectedUser.name} */}
							 {/* {selectedUser.name.toUpperCase()} */}
						</h3>
						<p className="text-sm text-base-content/70">
							{onlineUsers.includes(selectedUser._id)
								? "Online"
								: "Offline"}
						</p>
					</div>
				</div>
			</div>
		</div>
   
  )
}

export default ChatHeader