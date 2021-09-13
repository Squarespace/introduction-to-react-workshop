import React, { useEffect, useState } from 'react';

import useProfileState from '../hooks/useProfileState';
import FormInput from './FormInput';
import AvatarSelection from './AvatarSelection';
import { avatarNames } from '../utils/getAvatarUrl';

import {
  createProfile,
  updateProfile,
  requestStatus,
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

export default function ProfileForm({
  setIsModalOpen,
}) {
  const [status, setStatus] = useState(requestStatus.NONE);

  const {
    profiles,
    searchProfiles,
    selectedProfileIndex,
    setSelectedProfileIndex,
  } = useProfileState();

  const selectedProfile = profiles[selectedProfileIndex];

  const [formState, setFormState] = useState(selectedProfile || defaultState);

  const isEditingProfile = formState.id !== undefined;

  const profileAction = isEditingProfile ? 'Edit' : 'Create';
  const errorAction = isEditingProfile ? 'editing' : 'creating';

  useEffect(() => {
    return function unmount() {
      searchProfiles();
      setSelectedProfileIndex();
    }
  }, [
    searchProfiles,
    setSelectedProfileIndex,
  ]);

  return (
    <>
      <h2 className="ui dividing header">{`${profileAction} Profile`}</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setStatus(requestStatus.PENDING);
      
          const apiAction = isEditingProfile
            ? updateProfile
            : createProfile;

          try {
            await apiAction(formState);
      
            setIsModalOpen(false);
            setStatus(requestStatus.SUCCESS);
          } catch(error) {
            // in a production application, we would log this error message and map it
            // to text we would like to display in the UI
            setStatus(requestStatus.ERROR);
          }
        }}
        className="ui form scrolling content"
        autoComplete="off"
      >
        {status === requestStatus.ERROR && (
          <div className="ui error message">{`There was an error ${errorAction} the profile, please try again`}</div>
        )}
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
            disabled={status === requestStatus.PENDING}
          >Submit</button>
        </div>
      </form>
    </>
  );
}
