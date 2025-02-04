import {create} from "zustand"
import axiosInstance from "../utils/axios.js"
import {toast} from "react-hot-toast"
import { io } from "socket.io-client";


const BASE_URL="http://localhost:4444"

export const authStore=create((set,get)=>({
    authUser:null,
    isSigningUp: false,
	isLoggingIn: false,
    isCheckingAuth:true,
    isUpdatingProfile:false,
    isUpdatingPassword:false,
    onlineUsers:[],
    socket:null, //initial state

    checkAuth:async()=>{
        try{
            const response=await axiosInstance.get('/auth/check')
            set({authUser:response.data})
            get().connectSocket();
        }
        catch(error){
			console.log("Error in checkAuth: ", error.message);
            set({authUser:null})
        }
        finally{
            set({isCheckingAuth:false});
        }

    },

    signup:async(data)=>{
        set({isSigningUp:true})
        try{
            const response=await axiosInstance.post('/auth/signup',data)
            set({authUser:response.data.user})
            toast.success("Account created successfully!!!",{position:"bottom-left"});
            get.connectSocket();
        }
        catch(error){
            toast.error(error.response.data.message,{position:"bottom-left"})
        }
        finally{
            set({isSigningUp:false})
        }

    },
    login:async(data)=>{
        // const navigate=useNavigate();
        set({isLoggingIn:true})
        try{
            const response=await axiosInstance.post('/auth/login',data)
            // console.log(response.data.user);
            // set({authUser:response.data})
            set({authUser:response.user})
            toast.success("Logged in successfully!!!",{position:"bottom-left"});

            // console.log(get.connectSocket());

            if (get.connectSocket) {
                get.connectSocket(); // Safeguard connectSocket
            }
            // get.connectSocket();

            // navigate('/');
        }
        catch(error){
            toast.error(error.response.data.message,{position:"bottom-left"})
        }
        finally{
            set({isLoggingIn:false})
        }
    },
    logout:async()=>{
        try{
            await axiosInstance.post('/auth/logout');
            set({authUser:null})
            toast.success("Logged out successfully!!!",{position:"bottom-left"})
            get().disconnectSocket();
        }
        catch(error){
            toast.error(error.response.data.message)
        }

    },
    updateProfile:async(data)=>{
        set({isUpdatingProfile:true})
        try{
            const response=await axiosInstance.post('/auth/update-profile',data,{
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            // console.log(response.data.user);
            set({authUser:response.data.user})
            toast.success("Profile Photo updated successfully!!!",{position:"bottom-left"});
        }
        catch(error){
            toast.error(error.response.data.message,{position:"bottom-left"})
        }
        finally{
            set({isUpdatingProfile:false})
        }
            
    },
    forgotPassword:async(data)=>{
        set({isUpdatingPassword:true})
        try{
            const response=await axiosInstance.post('/auth/forgot-password',data)
            set({authUser:response.data.user})
            toast.success("Password updated successfully!!!",{position:"bottom-left"});
        }
        catch(error){
            toast.error(error.response.data.message)
        }
        finally{
            set({isUpdatingPassword:false})
        }
    },
    connectSocket:()=>{
        const { authUser } = get();

		if(!authUser || get().socket?.connected ) return;

		const socket = io(BASE_URL, {
			query: {
				userId:authUser._id,
			}
		});
        // console.log("socket is: ",socket);
		socket.connect();
		
		set({ socket: socket });

		socket.on("getOnlineUsers", (userIds) => {
			set({ onlineUsers: userIds });
		})

    },
    disconnectSocket: () => {
		if(get().socket?.connected) get().socket.disconnect();
	}
        

}));