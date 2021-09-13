// BEGIN: code we are writing in this step
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
  // This code is extracted from App and passed into
  // the context value
  const [profiles, setProfiles] = useState(emptyArray);
  const [searchTerm, setSearchTerm] = useState('');

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
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
// END: code we are writing in this step
