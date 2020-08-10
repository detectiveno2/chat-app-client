import React, { useContext } from 'react';
import classNames from 'classnames';

import User from '../../contexts/UserContext';
import './TextMessage.css';

function TextMessage({ mess }) {
  const { author, avatarUrl, content, date } = mess;
  const { user } = useContext(User);
  const messageClass = classNames({
    systemMessage: author === 'system' ? true : false,
    userMessage: user.userName === author ? true : false,
    memberMessage:
      user.userName !== author && author !== 'system' ? true : false,
  });

  return (
    <div className="TextMessage">
      <div className={messageClass}>
        {messageClass !== 'systemMessage' && (
          <div className="AvatarArea">
            <img width="52" src={avatarUrl} alt="avatar-group" />
          </div>
        )}
        <div className="ContentArea">
          <div className="AuthorTime">
            {messageClass === 'userMessage' ? (
              <p>
                <span className="HiddenTime">{date.slice(0, 10)}</span>{' '}
                <span className="AuthorTitle">Me</span>{' '}
                <span className="TimeTitle">{`${date.slice(11, 16)}`}</span>
              </p>
            ) : (
              <p>
                <span className="AuthorTitle">{author}</span>{' '}
                <span className="TimeTitle">{`${date.slice(11, 16)}`}</span>{' '}
                <span className="HiddenTime">{date.slice(0, 10)}</span>
              </p>
            )}
          </div>
          <div className="MainContent">{content}</div>
        </div>
      </div>
    </div>
  );
}

export default TextMessage;
