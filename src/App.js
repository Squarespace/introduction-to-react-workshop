import React, { useEffect, useState } from 'react';

import {
  getProfiles,
} from './api';
import SearchForm from './components/SearchForm';
import ProfileGrid from './components/ProfileGrid';

const emptyArray = [];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [profiles, setProfiles] = useState(emptyArray);

  async function searchProfiles(searchTerm = '') {
    try {
      const result = await getProfiles(searchTerm);
      setProfiles(result.data);
    } catch (error) {
      console.log('error', error);
    }
  }

  // search profiles on mount
  useEffect(() => {
    searchProfiles();
  }, []);

  return (
    <div className="ui main container">
      <h1 className="ui dividing header">Profiles</h1>
      <SearchForm
        searchProfiles={searchProfiles}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <ProfileGrid profiles={profiles} />
    </div>
  );
}
