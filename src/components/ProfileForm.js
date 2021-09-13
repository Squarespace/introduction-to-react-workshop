import React, { useState } from 'react';

import FormInput from './FormInput';
import { avatarNames } from '../utils/getAvatarUrl';
import useProfileState from '../hooks/useProfileState';

import {
  createProfile,
} from '../api';

const defaultState = {
  avatar: avatarNames[0],
  firstName: '',
  lastName: '',
  email: '',
};

// Having the FormInput configuration in an array
// makes it easy to iterate over within the render
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
            // We reset the form to the default state
            // on success so we can start in a new profile
            setFormState(defaultState);
            // We search the profiles again so that the
            // new profile will be displayed in the grid
            searchProfiles();
          } catch(error) {
            console.log('error', error);
          }
        }}
        className="ui form scrolling content"
        autoComplete="off"
      >
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
