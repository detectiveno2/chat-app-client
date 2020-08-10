import React, { useContext, useEffect, useState } from 'react';

import ListMemberItem from '../ListMemberItem/ListMemberItem';

import Room from '../../contexts/RoomContext';
import roomsApi from '../../api/roomsApi';
import './ConversationInfo.css';

function ConversationInfo() {
  const { shownRoom, socket } = useContext(Room);
  const [members, setMembers] = useState([]);

  // SocketIO
  if (socket) {
    socket.on('replyJoinRoom', ({ members }) => {
      setMembers(members);
    });
  }

  useEffect(() => {
    const fetchMemberOnRoom = async () => {
      try {
        if (!shownRoom._id) return;
        const members = await roomsApi.getMemberOnRoom(shownRoom._id);
        setMembers(members);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMemberOnRoom();
  }, [shownRoom]);

  return (
    <div className="ConversationInfo">
      {!shownRoom ? (
        <div className="NoShownRoom">
          <p>Create or join a room to start your conversation</p>
        </div>
      ) : (
        <div>
          <div className="GroupInfo">
            <div className="AvatarGroup">
              <div className="WrapAvatarGroup1">
                <div className="WrapAvatarGroup2">
                  <div className="WrapAvatarGroup3">
                    <img
                      src={shownRoom.avatarGroupUrl}
                      alt="avatar group"
                      width="230px"
                      height="230px"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="NameGroup">
              <p>{shownRoom.roomName}</p>
            </div>
          </div>
          <div className="ListMember">
            {members.map((member) => (
              <ListMemberItem key={member._id} member={member} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ConversationInfo;
