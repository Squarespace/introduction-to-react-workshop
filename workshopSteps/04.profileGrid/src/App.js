import React, { useEffect, useState } from 'react';

import {
  getProfiles,
} from './api';
// BEGIN: code we are writing in this step
import SearchForm from './components/SearchForm';
import ProfileGrid from './components/ProfileGrid';

const emptyArray = [];
// END: code we are writing in this step

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  // BEGIN: code we are writing in this step
  const [profiles, setProfiles] = useState(emptyArray);
  // END: code we are writing in this step

  async function searchProfiles(searchTerm = '') {
    try {
      const result = await getProfiles(searchTerm);
      // BEGIN: code we are writing in this step
      setProfiles(result.data);
      // END: code we are writing in this step
    } catch (error) {
      console.log('error', error);
    }
  }

  // BEGIN: code we are writing in this step
  // search profiles on mount
  useEffect(() => {
    searchProfiles();
  }, []);
  // END: code we are writing in this step

  return (
    <div className="ui main container">
      <h1 className="ui dividing header">Profiles</h1>
      {/* BEGIN: code we are writing in this step */}
      <SearchForm
        searchProfiles={searchProfiles}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <ProfileGrid profiles={profiles} />
      {/* END: code we are writing in this step */}
    </div>
  );
}
