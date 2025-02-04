import {create} from "zustand"
import toast from "react-hot-toast"
import axiosInstance from "../utils/axios.js"
import { authStore } from "./authStore.js"

export const chatStore=create((set,get)=>({
    messages:[],
    users:[],
    isUserLoading:false,
    isMessageLoading:false,
    isImageUploading:false,
    selectedUser:null,

    getUsers:async()=>{
        set({isUserLoading:true})
        try{
            const response=await axiosInstance.get("/message/users");
            set({users:response.data})
        }
        catch(error){
            toast.error("users cant fetched",error.response.data.message,{position:"bottom-left"});
        }
        finally{
            set({isUserLoading:false})
        }

    },


    getMessages:async(userId)=>{
        set({isMessageLoading:true}); //set loading to true
        try{
            const response=await axiosInstance.get(`message/get/${userId}`) //fetch messages
            console.log(response.data.data);
            set({messages:response.data.data})//update messages state
            // console.log(response.data.data);
            // const{messages}=get();
            // console.log(messages);
            
        }

        catch(error){
            console.log(error);
            toast.error("messages cant fetched",{position:"bottom-left"});
        }
        finally{
            set({isMessageLoading:false}) //reset loading state
        }
    },


    sendMessages:async(messageData)=>{
        const{selectedUser,messages}=get();

        // Check if an image is being uploaded

        if(messageData.get("image")!==null){
            set({isImageUploading:true})
        }

        try{
            const response=await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData,
                {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // console.log(response.data.data.text);
            // console.log(response.data.image);
            
            // Add the new message to the existing messages
            set({ messages: [...messages, response.data.data] });
        }
        catch(error){
            const errorMessage = error.response?.data?.message || "Failed to send message.";
            toast.error(errorMessage,{position:"bottom-left"});
        }

        finally{
            set({isImageUploading:false})
        }

    },


    subscribeToMessages: () => {
		const { selectedUser } = get();
		if (!selectedUser) return;

		const socket = authStore.getState().socket;
        // console.log("socket is: ",socket);
        if (!socket) {
            console.error("Socket is not initialized.");
            return;
        }

		socket.on("newMessage", (newMessage) => {
			const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
			if (!isMessageSentFromSelectedUser) return;

			set({ messages: [...get().messages, newMessage], })
			// console.log(get().messages)
		})
	},


	unsubscribeFromMessages: () => {
		const socket = authStore.getState().socket;
		socket.off("newMessage");
	},


	setSelectedUser: (selectedUser) => {
		set({ selectedUser });
	},

}))