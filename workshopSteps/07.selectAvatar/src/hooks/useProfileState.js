import React from 'react';
import {
  ProfileContext,
} from '../providers/ProfileProvider';

export default function useProfileState() {
  const context = React.useContext(ProfileContext)
  if (!context) {
    throw new Error(`useProfileState must be used within a ProfileProvider`)
  }
  return context
}
