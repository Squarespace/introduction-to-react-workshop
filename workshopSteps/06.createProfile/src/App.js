import React from 'react';

import SearchForm from './components/SearchForm';
import ProfileGrid from './components/ProfileGrid';
import ProfileForm from './components/ProfileForm';
import ProfileProvider from './providers/ProfileProvider';

export default function App() {
  return (
    <ProfileProvider>
      <div className="ui main container">
        <h1 className="ui dividing header">Profiles</h1>
        {/* BEGIN: code we are writing in this step */}
        <ProfileForm />
        {/* END: code we are writing in this step */}
        <SearchForm />
        <ProfileGrid />
      </div>
    </ProfileProvider>
  );
}
