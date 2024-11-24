import ChangePasswordDialog from '@/components/common/EditPassword';
import { PhotoActionDialog } from '@/components/common/UploadeProfile';
import { ThemeSwitch } from '@/components/drawers/DropDown';
import { Sun } from 'lucide-react';
import React, { useState } from 'react';

interface Props {
  showStatusBar: boolean;
  handleCheckedChange: () => void;
}

const ProfileEdit: React.FC<Props> = ({ handleCheckedChange, showStatusBar }) => {
  const [fullName, setFullName] = useState('');
  const [website, setWebsite] = useState('');
  const [isValidUrl, setIsValidUrl] = useState<true | false>(true);
  const [bio, setBio] = useState('');
  const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;
  function handleWebsite(e: React.ChangeEvent<HTMLInputElement>) {
    const inpValue = e.target.value
    setWebsite(inpValue);

    setIsValidUrl(urlRegex.test(inpValue))
  }

  return (
    <div className={` min-h-screen w-full bg-gray-100 dark:bg-black`}>
      <div className="w-full h-screen md:min-h-screen md:h-auto bg-gray-100 dark:bg-black  md:p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-lg shadow-lg mt-10 md:mt-0 mb-10 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold dark:text-white">Settings</h2>
            <div className=" dark:text-white font-extrabold " ><ThemeSwitch handleCheckedChange={handleCheckedChange} showStatusBar={showStatusBar} /></div>
          </div>
          <h3 className="text-xl font-medium mb-6 dark:text-white">Edit profile</h3>
          <div className="flex items-center space-x-4 mb-6">
            <img
              src="https://i.pinimg.com/736x/84/00/00/8400001570383307a28c7dcde76883b4.jpg"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="p-4 sm:p-6 md:p-8">
              <p className="text-base sm:text-lg md:text-xl font-bold dark:text-white text-center sm:text-left">
                Danish
              </p>
              <div className="flex flex-col sm:flex-row justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
                <PhotoActionDialog/>
               <ChangePasswordDialog/>
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
              placeholder='Add link'
              className={`w-full px-3 py-2 border rounded-md ${isValidUrl ? 'border-gray-300' : 'border-red-500'
                } bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600`}
            />
            {!isValidUrl && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid URL.
              </p>
            )}
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
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
