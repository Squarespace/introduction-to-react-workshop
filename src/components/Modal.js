import React, { useEffect } from 'react';

// these are Semantic UI CSS classes that lock the scroll of the HTML <body>
const scrollLockClassNames = ['dimmable', 'dimmed'];

export default function Modal({
  children,
  isModalOpen,
  setIsModalOpen,
}) {
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add(...scrollLockClassNames);
    } else {
      document.body.classList.remove(...scrollLockClassNames);
    }
  }, [isModalOpen]);

  if (!isModalOpen) {
    return null;
  }

  return (
    <div
      className="ui dimmer active"
      onClick={(event) => {
        // this click handler uses event delegation to check if the overlay was clicked
        // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation
        if (event.target.classList.contains('dimmer')) {
          setIsModalOpen(false);
        }
      }}
    >
      <div className="ui modal active">
        {children}
      </div>
    </div>
  );
}