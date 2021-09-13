// BEGIN: code we are writing in this step
import React from 'react';

export default function SearchForm(props) {
  return (
    <form
      className="ui form container"
      onSubmit={(event) => {
        event.preventDefault();
        props.searchProfiles(props.searchTerm);
      }}
    >
      <div className="field">
        <div className="ui icon input">
          <input
            value={props.searchTerm}
            onChange={(event) => {
              props.setSearchTerm(event.target.value);
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
// END: code we are writing in this step
