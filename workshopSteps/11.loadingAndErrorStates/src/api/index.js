import axios from 'axios';

const baseUrl = 'http://localhost:3001/profiles/';

function getBaseUrlWithId(id) {
  return `${baseUrl}${id}`;
}

export const requestStatus = {
  NONE: 'none',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
};

export async function getProfiles(searchTerm = '') {
  // order by the date the profile was created
  return await axios.get(`${baseUrl}?_sort=createdAt&_order=desc`, {
    params: {
      q: searchTerm,
    },
  });
}

export async function createProfile(profile) {
  return await axios.post(baseUrl, profile);
}

export async function updateProfile(profile) {
  if (!profile.id) {
    throw new Error('A profile ID must be included to make updates to a profile');
  }

  return await axios.put(getBaseUrlWithId(profile.id), profile);
}

export async function deleteProfile(id) {
  return await axios.delete(getBaseUrlWithId(id));
}
