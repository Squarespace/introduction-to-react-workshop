import React from 'react';

import getAvatarUrl from '../utils/getAvatarUrl';
import useProfileState from '../hooks/useProfileState';
import { deleteProfile } from '../api';

export default function ProfileGrid({
  setIsModalOpen,
}) {
  const {
    profiles,
    searchProfiles,
    searchTerm,
    setSelectedProfileIndex,
  } = useProfileState();

  return (
    <div className="ui four stackable cards">
      {profiles.map((profile, index) => {
        const fullName = `${profile.firstName} ${profile.lastName}`;

        return (
          <div key={profile.id} className="ui centered card">
            <div className="image">
              <img
                alt={fullName}
                src={getAvatarUrl(profile.avatar, 'large')}
              />
            </div>
            <div className="content">
              <h3 className="header">{fullName}</h3>
              <p className="email">{profile.email}</p>
            </div>
            <div className="extra content">
              <button
                className="ui red button"
                onClick={async () => {
                  await deleteProfile(profile.id);
                  searchProfiles(searchTerm);
                }}
              >
                Delete
              </button>
              {/* BEGIN: code we are writing in this step */}
              <button
                className="ui primary button"
                onClick={() => {
                  setSelectedProfileIndex(index);
                  setIsModalOpen(true);
                }}
              >
                Edit
              </button>
              {/* END: code we are writing in this step */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
