import React from 'react';

import getAvatarUrl from '../utils/getAvatarUrl';
import useProfileState from '../hooks/useProfileState';

export default function ProfileGrid() {
  // We pull in useProfileState, and switch from 
  // using props to using the hook
  // BEGIN: code we are writing in this step
  const {
    profiles,
  } = useProfileState();
  // END: code we are writing in this step

  return (
    <div className="ui four stackable cards">
      {profiles.map((profile) => {
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
          </div>
        );
      })}
    </div>
  );
}
