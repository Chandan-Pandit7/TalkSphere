import React, { useState } from 'react'
import { authStore } from '../store/authStore.js'
import toast from 'react-hot-toast'
import { CameraIcon,User,Mail } from 'lucide-react'

const ProfilePage = () => {
  const{authUser,isUpdatingProfile,updateProfile}=authStore();
  const[selectedImg,setSelectedImg]=useState(null);

  const imageUploadHandler=async(e)=>{
    const image=e.target.files[0];
	// console.log(image);
    if(!image) {
		toast.error('Please select an image');
		return ;
	}
	const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(image.type)) {
        toast.error("Invalid file type! Please upload a JPEG, PNG, or GIF image.");
        return;
    }

    // Validate file size (e.g., limit to 5MB)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (image.size > maxSizeInBytes) {
        toast.error("File size exceeds 5MB. Please upload a smaller image.");
        return;
    }
    // toast.success("button clicked successfully")
    setSelectedImg(URL.createObjectURL(image));


    const formData=new FormData();
    formData.append("profilePic",image);

	try {
        await updateProfile(formData);
        toast.success("Profile updated successfully!");
    } catch (error) {
        console.error("Error updating profile:", error);
        toast.error(error.response?.data?.message || "Failed to update profile.");
    }

    // await updateProfile(formData);

  }


  return (
    <div>
      <div className="h-full pt-20 ">
				<div className="max-w-2xl mx-auto p-4 py-8">
					<div className="bg-base-300 rounded-xl p-6 space-y-8">
						<div className="text-center">
							<h1 className="text-2xl font-semibold">
								Profile
							</h1>
							<p className="mt-2">
								Your profile information
							</p>
						</div>

						{/* Avatar Image Section */}

						<div className="flex flex-col items-center gap-4">
							<div className="relative">
								<img
									src={
										selectedImg || authUser.user?.profilePic ||
										"/avatar.png"
									}
									alt="profile"
									className="size-32 rounded-full border-4 object-cover"
								/>
								<label
									htmlFor="avatar-upload"
									className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200
                    ${
					isUpdatingProfile
						? "animate-pulse pointer-events-none"
						: ""
				}
                    `}
								>
									<CameraIcon className="size-5 text-base-200" />
									<input
										type="file"
										id="avatar-upload"
										className="hidden"
										accept="image/*"
										onChange={imageUploadHandler}
										disabled={isUpdatingProfile}
									/>
								</label>
							</div>
							<p className="text-sm text-zinc-400">
								{isUpdatingProfile
									? "Uploading..."
									: "Click the camera icon to upload a new profile picture"}
							</p>
						</div>

						{/* Form Section */}
						<div className="space-y-6">
							<div className="space-y-1.5">
								<div className="text-sm text-zinc-400 flex items-center gap-2">
									<User className="size-4" />
									Name
								</div>
								<p className="px-4 py-2.5 bg-base-200 rounded-lg border">
									{authUser.user?.name}
								</p>
							</div>

							<div className="space-y-1.5">
								<div className="text-sm text-zinc-400 flex items-center gap-2">
									<Mail className="size-4" />
									Email
								</div>
								<p className="px-4 py-2.5 bg-base-200 rounded-lg border">
									{authUser.user?.email}
								</p>
							</div>
            </div>
            
            {/* Additional info */}

            <div className="mt-6 bg-base-300 rounded-xl p-6">
              <h2 className="text-lg font-medium mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Member Since </span>
                  <span>{authUser.user.createdAt?.split("T")[0] }</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Account Status</span>
                  <span className="text-green-500">Active</span>
                </div>
              </div>
            </div>




					</div>
				</div>
			</div>
      


      
    </div>

    
  )
}

export default ProfilePage