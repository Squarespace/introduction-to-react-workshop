import React from 'react';
import classnames from 'classnames';

import useProfileState from '../hooks/useProfileState';
import {
  requestStatus,
} from '../api';

export default function SearchForm() {
  const {
    profiles,
    searchProfiles,
    searchTerm,
    setSearchTerm,
    status,
  } = useProfileState();

  return (
    <form
      className="ui form container"
      onSubmit={(event) => {
        event.preventDefault();
        searchProfiles(searchTerm);
      }}
    >
      <div className="field">
        <div
          // BEGIN: code we are writing in this step
          className={classnames('ui icon input', {
            loading: status === requestStatus.PENDING,
          })}
          // END: code we are writing in this step
        >
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
      {/* BEGIN: code we are writing in this step */}
      {profiles.length === 0 && (
        <div className="ui message">No results for this search query</div>
      )}
      {/* END: code we are writing in this step */}
    </form>
  );
}
