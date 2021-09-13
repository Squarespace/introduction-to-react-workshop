import React, { useState } from 'react';

import FormInput from './FormInput';
import { avatarNames } from '../utils/getAvatarUrl';
import useProfileState from '../hooks/useProfileState';
import AvatarSelection from './AvatarSelection';

import {
  createProfile,
} from '../api';

const defaultState = {
  avatar: avatarNames[0],
  firstName: '',
  lastName: '',
  email: '',
};

const formInputConfigs = [
  {
    label: 'First Name',
    id: 'firstName',
    type: 'text',
  },
  {
    label: 'Last Name',
    id: 'lastName',
    type: 'text',
  },
  {
    label: 'Email',
    id: 'email',
    type: 'email',
  },
];

export default function ProfileForm() {
  const [formState, setFormState] = useState(defaultState);

  const {
    searchProfiles,
  } = useProfileState();

  return (
    <>
      <h2 className="ui dividing header">Create Profile</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          try {
            await createProfile(formState);
            setFormState(defaultState);
            searchProfiles();
          } catch(error) {
            console.log('error', error);
          }
        }}
        className="ui form scrolling content"
        autoComplete="off"
      >
        <AvatarSelection
          selectedAvatar={formState.avatar}
          onChange={(event) => {
            setFormState((prevState) => {
              return {
                ...prevState,
                avatar: event.target.value,
              }
            });
          }}
        />
        {formInputConfigs.map((formInputConfig) => {
          return (
            <FormInput
              key={formInputConfig.id}
              label={formInputConfig.label}
              id={formInputConfig.id}
              type={formInputConfig.type}
              value={formState[formInputConfig.id]}
              onChange={(event) => {
                setFormState((prevState) => {
                  return {
                    ...prevState,
                    [formInputConfig.id]: event.target.value,
                  }
                });
              }}
            />
          );
        })}
        <div className="actions">
          <button
            type="submit"
            className="ui button"
          >Submit</button>
        </div>
      </form>
    </>
  );
}
