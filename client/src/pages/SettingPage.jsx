import React, { useRef, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import avatarImg from '../public/avatar.png'
import { Camera, Home, Mail, User } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

const SettingPage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [ selectedImg, setSelectedImg ] = useState();
  const imgRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="bg-gradient-to-br from-green-200 via-white to-green-100 max-w-3xl w-full md:w-2/3 lg:w-1/2 mx-auto mt-[6rem] rounded-3xl shadow-2xl px-8 py-12 flex flex-col items-center justify-center">
      <div className="w-full flex flex-col gap-8 shadow-2xl backdrop-blur-2xl bg-white/70 rounded-2xl p-8">
        <div className='relative flex items-center'>
          <h1 className="text-3xl font-bold text-center mx-auto mb-2">Profile Settings</h1>
          <Link to={'/home'}>
            <button
            type='button'
            className='absolute right-2'
            title='Home Page'
            >
              <Home />
            </button>
          </Link>
        </div>
        <p className="text-center text-gray-500 mb-6">Manage your profile information and account details</p>
        
        {/* Profile Picture Section */}
        <section aria-label="Profile Picture" className="flex flex-col items-center gap-2">
          <div className="relative">
            <img
              src={selectedImg || authUser.profilePic || avatarImg}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-green-300 shadow-lg"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md cursor-pointer transition ${isUpdatingProfile ? "animate-pulse opacity-60" : "hover:bg-green-100"}`}
            >
              <button
                type="button"
                onClick={() => imgRef.current?.click()}
                disabled={isUpdatingProfile}
              >
                <Camera className="w-6 h-6 text-green-600" />
              </button>
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                ref={imgRef}
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
          </p>
        </section>

        {/* User Details Section */}
        <section aria-label="User Details" className="bg-green-50 rounded-xl p-4 flex flex-col gap-3 shadow">
          <div className="flex items-center gap-3">
            <User className="text-green-600" />
            <span className="font-semibold">Name:</span>
            <span>{authUser?.fullname}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-green-600" />
            <span className="font-semibold">Email:</span>
            <span>{authUser?.email}</span>
          </div>
        </section>

        {/* Account Details Section */}
        <section aria-label="Account Details" className="bg-green-50 rounded-xl p-4 flex flex-col gap-3 shadow">
          <h2 className="text-lg font-semibold mb-2">Account Information</h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Member since</span>
            <span className="font-mono">{authUser.createdAt?.split("T")[0]}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Account Status</span>
            <span className="text-green-500 font-semibold">Active</span>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SettingPage