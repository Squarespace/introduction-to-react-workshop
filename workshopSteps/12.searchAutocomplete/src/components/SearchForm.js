import React from 'react';
import classnames from 'classnames';

import useProfileState from '../hooks/useProfileState';
import {
  requestStatus,
} from '../api';

let timeoutId;

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
          className={classnames('ui icon input', {
            loading: status === requestStatus.PENDING,
          })}
        >
          <input
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);

              // BEGIN: code we are writing in this step
              // We want to clear the existing timeout every time
              // the user types something.
              clearTimeout(timeoutId);

              // We restart the timer for requesting profiles,
              // so when the user stops typing the request will be made.
              timeoutId = setTimeout(() => {
                searchProfiles(event.target.value);
              }, 250);
              // END: code we are writing in this step
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
      {profiles.length === 0 && (
        <div className="ui message">No results for this search query</div>
      )}
    </form>
  );
}
