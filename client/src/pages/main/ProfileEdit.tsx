import ChangePasswordDialog from '@/components/common/EditPassword';
import { PhotoActionDialog } from '@/components/common/UploadeProfile';
import { ThemeSwitch } from '@/components/drawers/DropDown';
import SpinnerIcon from '@/components/loaders/LoadingSpinner';
import useUpdateUserProfile from '@/hooks/useUpdateProfile';
import { AuthUser } from '@/types/QueryTypes/queary';
import { useQuery } from '@tanstack/react-query';
import { Sun } from 'lucide-react';
import React, { useState } from 'react';

interface Props {
  showStatusBar: boolean;
  handleCheckedChange: () => void;
}

const ProfileEdit: React.FC<Props> = ({ handleCheckedChange, showStatusBar }) => {
  const { data: authUser } = useQuery<AuthUser>({ queryKey: ["authUser"] });

  const [fullName, setFullName] = useState(authUser?.fullName);
  const [username, setUsername] = useState(authUser?.username);
  const [email, setEmail] = useState(authUser?.email);
  const [website, setWebsite] = useState(authUser?.link);
  const [profileImg, setProfileImg] = useState(authUser?.profileImg);
  const [isValidUrl, setIsValidUrl] = useState<true | false>(true);
  const [bio, setBio] = useState(authUser?.bio);
  const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;
  function handleWebsite(e: React.ChangeEvent<HTMLInputElement>) {
    const inpValue = e.target.value
    setWebsite(inpValue);

    setIsValidUrl(urlRegex.test(inpValue))
  }

  const { isUpdatingProfile, updateProfile } = useUpdateUserProfile()
  function handleSubmit() {
    console.log(profileImg,"==profile")
    let formData = {
      fullName,
      username,
      email,
      link: website,
      bio,
      profileImg,
    }
    updateProfile(formData)
  }
  return (
    <div className="min-h-screen   md:p-0 w-full bg-gray-100 dark:bg-black">
      <div className="w-full md:p-6  overflow-y-scroll max-h-screen ">
        <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 md:rounded-lg shadow-lg mt-10 md:mt-0 mb-10 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold dark:text-white">Settings</h2>
            <div className="dark:text-white font-extrabold">
              <ThemeSwitch handleCheckedChange={handleCheckedChange} showStatusBar={showStatusBar} />
            </div>
          </div>
          <h3 className="text-xl font-medium mb-6 dark:text-white">Edit profile</h3>
          <div className="flex items-center space-x-4 mb-6">
            <img
             src={profileImg || "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="p-4 sm:p-6 md:p-8">
              <p className="text-base sm:text-lg md:text-xl font-bold dark:text-white text-center sm:text-left">
               {authUser?.username}
              </p>
              <div className="flex flex-col sm:flex-row justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
                <PhotoActionDialog setProfileImg={setProfileImg} />
                <ChangePasswordDialog />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 dark:text-gray-300" htmlFor="website">
              Website
            </label>
            <input
              id="website"
              type="text"
              value={website}
              onChange={(e) => handleWebsite(e)}
              placeholder="Add link"
              className={`w-full px-3 py-2 border rounded-md ${isValidUrl ? 'border-gray-300' : 'border-red-500'
                } bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600`}
            />
            {!isValidUrl && (
              <p className="text-red-500 text-sm mt-1">Please enter a valid URL.</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 dark:text-gray-300" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={50}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{username.length} / 50</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 dark:text-gray-300" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              maxLength={50}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{fullName.length} / 50</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 dark:text-gray-300" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={50}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            />

          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 dark:text-gray-300" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={150}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              rows={3}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{bio.length} / 150</p>
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full py-2 flex justify-center  bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            {isUpdatingProfile ? <SpinnerIcon  /> : "Submit"}
          </button>
        </div>
      </div>
    </div>

  );
};

export default ProfileEdit;
