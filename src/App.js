import React from 'react';

import SearchForm from './components/SearchForm';
import ProfileGrid from './components/ProfileGrid';
import ProfileProvider from './providers/ProfileProvider';

// In this step, we import ProfileProvider and
// wrap the entire app with it. We then delete
// the state from the App function.
export default function App() {
  return (
    <ProfileProvider>
      <div className="ui main container">
        <h1 className="ui dividing header">Profiles</h1>
        {/*
          We no longer pass props into these components
          now that we are using context through a hook
        */}
        <SearchForm />
        <ProfileGrid />
      </div>
    </ProfileProvider>
  );
}
