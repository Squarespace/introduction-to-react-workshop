import React, {
  useEffect,
  useState,
} from 'react';

import {
  getProfiles,
} from '../api';

export const ProfileContext = React.createContext(undefined);

const emptyArray = [];

export default function ProfileProvider({
  children,
}) {
  const [profiles, setProfiles] = useState(emptyArray);
  const [searchTerm, setSearchTerm] = useState('');
  // BEGIN: code we are writing in this step
  const [selectedProfileIndex, setSelectedProfileIndex] = useState();
  // END: code we are writing in this step

  async function searchProfiles(searchTerm = '') {
    try {
      const result = await getProfiles(searchTerm);
      setProfiles(result.data);
      setSearchTerm(searchTerm);
    } catch (error) {
      console.log('error', error);
    }
  };

  // search profiles on mount
  useEffect(() => {
    searchProfiles();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        searchProfiles,
        searchTerm,
        setSearchTerm,
        // BEGIN: code we are writing in this step
        selectedProfileIndex,
        setSelectedProfileIndex,
        // END: code we are writing in this step
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
