import React from 'react';

import RecentRoom from '../RecentRoom/RecentRoom';
import './ListConversation.css';

function ListConversation(props) {
  const { showCreate, showJoin } = props;

  return (
    <div className="ListConversation">
      <div className="ButtonArea">
        <div>
          <button onClick={showCreate}>+Create Room</button>
        </div>
        <div>
          <button onClick={showJoin}>+Join Room</button>
        </div>
      </div>
      <div className="RecentRoomWrapper">
        <RecentRoom />
      </div>
    </div>
  );
}

export default ListConversation;
