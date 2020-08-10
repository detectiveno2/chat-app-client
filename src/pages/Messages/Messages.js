import React, { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';

import {
  ListConversation,
  ChatBox,
  Header,
  CreateModal,
  JoinModal,
  ConversationInfo,
} from '../../components';
import { RoomProvider } from '../../contexts/RoomContext';
import { UserProvider } from '../../contexts/UserContext';
import messagesApi from '../../api/messagesApi';
import { PrivateRoute } from '../../routes/index';

import './Messages.css';

function Messages() {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const data = await messagesApi.get();
        const { avatarUrl } = data;

        setAvatarUrl(avatarUrl);
      } catch (error) {
        window.alert('Something wrong, please try again.');
      }
    };

    fetchDataUser();
  }, []);

  const handleShowCreate = () => {
    setShowCreate(true);
  };

  const handleShowJoin = () => {
    setShowJoin(true);
  };

  const handleCloseModal = () => {
    setShowJoin(false);
    setShowCreate(false);
  };

  return (
    <RoomProvider>
      <UserProvider>
        <div className="Messages">
          <div className="HeaderWrapper">
            <Header avatarUrl={avatarUrl} />
          </div>
          <div className="MessagesContainer">
            <div className="ListConversationWrapper">
              <ListConversation
                showCreate={handleShowCreate}
                showJoin={handleShowJoin}
              />
            </div>
            <div className="ConversationInfoWrapper">
              <ConversationInfo />
            </div>
            <div className="ChatBoxWrapper">
              <Switch>
                <PrivateRoute
                  path="/messages/g/:id"
                  component={() => <ChatBox />}
                />
              </Switch>
            </div>
          </div>
        </div>
        {showCreate && (
          <div className="CreateModalWrapper">
            <div className="OutOfModal" onClick={handleCloseModal}></div>
            <CreateModal handleCloseModal={handleCloseModal} />
          </div>
        )}
        {showJoin && (
          <div className="CreateModalWrapper">
            <div className="OutOfModal" onClick={handleCloseModal}></div>
            <JoinModal handleCloseModal={handleCloseModal} />
          </div>
        )}
      </UserProvider>
    </RoomProvider>
  );
}

export default Messages;
