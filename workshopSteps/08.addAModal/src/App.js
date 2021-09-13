import React, { useState } from 'react';

import SearchForm from './components/SearchForm';
import ProfileGrid from './components/ProfileGrid';
import ProfileForm from './components/ProfileForm';
import ProfileProvider from './providers/ProfileProvider';
import Modal from './components/Modal';

export default function App() {
  // BEGIN: code we are writing in this step
  const [isModalOpen, setIsModalOpen] = useState(false);
  // END: code we are writing in this step

  return (
    <ProfileProvider>
      <div className="ui main container">
        <h1 className="ui dividing header">Profiles</h1>
        {/* BEGIN: code we are writing in this step */}
        <button
          className="ui button primary"
          onClick={() => setIsModalOpen(true)}
        >Create Profile</button>
        {/* END: code we are writing in this step */}
        <SearchForm />
        <ProfileGrid />
        {/* BEGIN: code we are writing in this step */}
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <ProfileForm setIsModalOpen={setIsModalOpen} />
        </Modal>
        {/* END: code we are writing in this step */}
      </div>
    </ProfileProvider>
  );
}
