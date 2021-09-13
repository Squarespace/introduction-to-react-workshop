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
  const [status, setStatus] = useState(requestStatus.NONE);

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
        status,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
