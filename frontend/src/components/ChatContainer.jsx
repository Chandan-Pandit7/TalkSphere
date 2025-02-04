import React, { useEffect, useRef } from 'react'
import { chatStore } from '../store/chatStore.js'
import ChatHeader from './ChatHeader.jsx';
import MessageInput from './MessageInput.jsx';
import MessageSkeleton from './skeletons/MessageSkeleton.jsx';
import { authStore } from '../store/authStore.js';
import { formatMessageTime } from '../utils/dateTime.js'

const ChatContainer = () => {
	
    const {
		messages,
		getMessages,
		isMessageLoading,
		selectedUser,
		subscribeToMessages,
		unsubscribeFromMessages,
    } = chatStore();
	// console.log(selectedUser);

    
    const { authUser } = authStore();
    const MessageEndRef = useRef(null);

    useEffect(() => {
		// console.log("selected user: ",selectedUser);
		if(selectedUser){
		    getMessages(selectedUser._id);
		    subscribeToMessages();
		}


		return () => unsubscribeFromMessages();
    }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);


    useEffect(() => {
		// console.log("messages: ",messages);
        MessageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // console.log("isMessageLoading:",isMessageLoading);
    if (isMessageLoading) return (
		<div className="flex flex-col flex-1 overflow-auto">
			<ChatHeader />
			<MessageSkeleton/>
			<MessageInput />
		</div>
    );

  return (
	<div className="flex flex-col w-full lg:flex-1 overflow-auto">
	<ChatHeader />

	<div
		className=" flex-1 overflow-y-auto no-scrollbar p-4 space-y-4"
		id="chatBox"
	>
		{messages.length === 0 && (
			<p className="text-zinc-300/30 text-center items-center justify-center relative h-full">
				{" "}
				<span className='absolute top-1/2 left-1/2 -translate-x-1/2 '>No New Messaages Yet to display!</span>{" "}
			</p>
		)}
		{messages?.map((message,index) => (
			<div
				key={message._id|| index}
				className={`chat ${
					message.senderId === authUser.user?._id
						? "chat-end"
						: "chat-start"
					}`}
				ref= {MessageEndRef}
			>
				<div className="chat-image avatar">
					<div className="size-10 rounded-full border">
						<img
							src={
								message.senderId === authUser.user?._id
									? authUser.user?.profilePic ||
									  "/avatar.png"
									: selectedUser.profilePic ||
									  "/avatar.png"
							}
							alt="avatar"
						/>
					</div>
				</div>
				<div className="chat-header mb-1">
					<time className="text-xs opacity-50 ml-1">
						{formatMessageTime(message.createdAt)}
					</time>
				</div>
				<div className="chat-bubble flex flex-col">
					{message.image && (
						<img
							src={message.image}
							alt="Attachment"
							className="sm:max-w-[200px] rounded-md mb-2"
						/>
					)}
					{message.text && <p> {message.text}</p>}
				</div>
			</div>
		))}
	</div>

	<MessageInput />
</div>
  );
}

export default ChatContainer