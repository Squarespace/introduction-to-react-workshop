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
