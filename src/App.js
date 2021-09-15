import React, { useState } from 'react';

import {
  getProfiles,
} from './api';

// Adding async before the function declaration lets us
// use async await within the function. We can write asynchronous
// code using syntax that looks synchronous, so we do not
// end up with deeply nested code
async function searchProfiles(searchTerm = '') {
  // Wrapping async await function calls in a try catch
  // gives us a chance to handle the error the way we choose
  // to. This way we can dislpay an error in the UI rather than
  // having it just appear in the browser console.
  try {
    const result = await getProfiles(searchTerm);
    // For now we are just logging the result. We will use
    // this data in follow-up steps.
    console.log('status', result.data);
  } catch (error) {
    console.log('error', error);
  }
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="ui main container">
      <h1 className="ui dividing header">Profiles</h1>
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
    </div>
  );
}
