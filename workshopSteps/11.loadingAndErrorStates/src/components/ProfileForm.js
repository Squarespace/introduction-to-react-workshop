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
  // BEGIN: code we are writing in this step
  const [status, setStatus] = useState(requestStatus.NONE);
  // END: code we are writing in this step

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
          // BEGIN: code we are writing in this step
          setStatus(requestStatus.PENDING);
          // END: code we are writing in this step
      
          const apiAction = isEditingProfile
            ? updateProfile
            : createProfile;
      
          try {
            await apiAction(formState);
      
            setIsModalOpen(false);
            // BEGIN: code we are writing in this step
            setStatus(requestStatus.SUCCESS);
          } catch(error) {
            // in a production application, we would log this error message and map it
            // to text we would like to display in the UI
            setStatus(requestStatus.ERROR);
            // END: code we are writing in this step
          }
        }}
        className="ui form scrolling content"
        autoComplete="off"
      >
        {/* BEGIN: code we are writing in this step */}
        {status === requestStatus.ERROR && (
          <div className="ui error message">{`There was an error ${errorAction} the profile, please try again`}</div>
        )}
        {/* END: code we are writing in this step */}
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
            // This would prevent the user from rapid-fire
            // submitting requests to create or update
            // profiles. Since we close the modal
            // immediately, we do not have this issue.
            disabled={status === requestStatus.PENDING}
          >Submit</button>
        </div>
      </form>
    </>
  );
}
