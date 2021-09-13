// BEGIN: code we are writing in this step
import React from 'react';

import getAvatarUrl from '../utils/getAvatarUrl';

export default function ProfileGrid(props) {
  return (
    <div className="ui four stackable cards">
      {/*
        Here we are rendering the list of profiles in a grid
        https://reactjs.org/docs/lists-and-keys.html
      */}
      {props.profiles.map((profile) => {
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
// END: code we are writing in this step
