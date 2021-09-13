import React from 'react';

import useProfileState from '../hooks/useProfileState';

export default function SearchForm() {
  // We pull in useProfileState, and switch from 
  // using props to using the hook
  // BEGIN: code we are writing in this step
  const {
    searchProfiles,
    searchTerm,
    setSearchTerm,
  } = useProfileState();
  // END: code we are writing in this step

  return (
    <form
      className="ui form container"
      onSubmit={(event) => {
        event.preventDefault();
        searchProfiles(searchTerm);
      }}
    >
      <div className="field">
        <div className="ui icon input">
          <input
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            className="prompt"
            autoComplete="off"
            type="text"
            placeholder="Search profiles"
          />
          <i className="search icon" />
        </div>
      </div>
      <button
        className="ui primary button"
        type="submit"
      >Profile Search</button>
    </form>
  );
}
