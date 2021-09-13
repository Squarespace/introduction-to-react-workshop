import React, { useState } from 'react';

import SearchForm from './components/SearchForm';
import ProfileGrid from './components/ProfileGrid';
import ProfileForm from './components/ProfileForm';
import ProfileProvider from './providers/ProfileProvider';
import Modal from './components/Modal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ProfileProvider>
      <div className="ui main container">
        <h1 className="ui dividing header">Profiles</h1>
        <button
          className="ui button primary"
          onClick={() => setIsModalOpen(true)}
        >Create Profile</button>
        <SearchForm />
        <ProfileGrid />
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <ProfileForm setIsModalOpen={setIsModalOpen} />
        </Modal>
      </div>
    </ProfileProvider>
  );
}
