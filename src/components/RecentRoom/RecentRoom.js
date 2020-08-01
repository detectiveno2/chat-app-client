import React, { useState, useContext } from 'react';
import classNames from 'classnames';

import Room from '../../contexts/RoomContext';
import RecentRoomItem from '../RecentRoomItem/RecentRoomItem';
import './RecentRoom.css';

function RecentRoom() {
  const RoomContext = useContext(Room);
  const [roomSelected, setRoomSelected] = useState('');
  const [isActive, setIsActive] = useState(false);
  const classNameListRoom = classNames('RecentRoom', { active: isActive });

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const handleSelect = (roomName, idRoom) => (event) => {
    setRoomSelected(roomName);
    RoomContext.getRoom(idRoom);
  };

  return (
    <div className={classNameListRoom}>
      <div className="BlockButton">
        <button onClick={toggleActive}>Recent Room</button>
      </div>
      <div className="ListRecentRoomWrapper">
        <div className="ListRecentRoom">
          {RoomContext.rooms.map((room) => (
            <RecentRoomItem
              roomName={room.roomName}
              key={room._id}
              idRoom={room._id}
              isSelected={roomSelected === room.roomName ? true : false}
              handleSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentRoom;
