// copy and paste this file to the main src directory

import React from 'react';
import classnames from 'classnames';

import getAvatarUrl, { avatarNames } from '../utils/getAvatarUrl';

export default function AvatarSelection({
  selectedAvatar,
  onChange,
}) {
  return (
    <>
      <h3 className="ui header">Choose Avatar</h3>
      <div className="ui four column doubling grid">
        {avatarNames.map((name) => {
          const isChecked = name === selectedAvatar;

          return (
            <div className="ui column" key={name}>
              <input
                checked={isChecked}
                hidden
                tabIndex="0"
                type="radio"
                id={name}
                name="avatar"
                value={name}
                onChange={onChange}
              />
              <label
                className={classnames('ui big label basic', {
                  teal: isChecked,
                })}
                // htmlFor functions the same as "for" does on an
                // HTML <label>. Similar to "className", this avoids
                // a naming conflict with the JS for loop
                htmlFor={name}
              >
                <i
                  className={classnames('circle icon', {
                    'teal check': isChecked,
                    'grey outline': !isChecked,
                  })}
                />
                <img
                  alt={name}
                  src={getAvatarUrl(name, 'small')}
                />
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
}
