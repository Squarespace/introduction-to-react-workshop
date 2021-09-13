import React, { useState } from 'react';

export default function App() {
  // This is our first use of useState. The React team chose
  // to return an array so the consumer can name the state value
  // and setState callback whatever they choose to within
  // the Array destructuring
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="ui main container">
      {/*
        note that we need to use className instead of class
        class has another function within JS, so there is a naming conflict
        className is what the React team chose to use instead
      */}
      <h1 className="ui dividing header">Profiles</h1>
      <form
        className="ui form container"
        onSubmit={(event) => {
          // we call event.preventDefault to stop the default bahavior
          // of the form, which is to refresh the page with the form
          // values included in the URL
          event.preventDefault();

          // here we log the result of the search term to demonstrate 
          // accessing a variable in scope within the callback
          console.log(searchTerm);
        }}
      >
        <div className="field">
          <div className="ui icon input">
            <input
              value={searchTerm}
              onChange={(event) => {
                // we have access to the same event properties as
                // when we bind an event listener in core JS
                // we use that to access the value of the input
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
