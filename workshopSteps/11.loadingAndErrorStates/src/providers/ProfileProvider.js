import React, {
  useEffect,
  useState,
} from 'react';

import {
  getProfiles,
  requestStatus,
} from '../api';

export const ProfileContext = React.createContext(undefined);

const emptyArray = [];

export default function ProfileProvider({
  children,
}) {
  const [profiles, setProfiles] = useState(emptyArray);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfileIndex, setSelectedProfileIndex] = useState();
  // BEGIN: code we are writing in this step
  const [status, setStatus] = useState(requestStatus.NONE);
  // END: code we are writing in this step

  async function searchProfiles(searchTerm = '') {
    setStatus(requestStatus.PENDING);

    try {
      const result = await getProfiles(searchTerm);
      setProfiles(result.data);
      setSearchTerm(searchTerm);
      setStatus(requestStatus.SUCCESS);
    } catch (error) {
      setStatus(requestStatus.ERROR);
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
        selectedProfileIndex,
        setSelectedProfileIndex,
        // BEGIN: code we are writing in this step
        status,
        // END: code we are writing in this step
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
