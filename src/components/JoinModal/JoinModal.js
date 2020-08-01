import React, { useState, useContext } from 'react';

import Room from '../../contexts/RoomContext';
import './JoinModal.css';

function JoinModal(props) {
  const { joinRoom } = useContext(Room);
  const [roomJoinName, setRoomJoinName] = useState('');
  const [roomJoinPassword, setRoomJoinPassword] = useState('');
  const [error, setError] = useState('');
  const { handleCloseModal } = props;

  const handleChange = (set) => (event) => set(event.target.value.trim());
  const handleError = (error) => setError(error);

  return (
    <div className="JoinModal">
      <div className="JoinModalMain">
        <form
          onSubmit={joinRoom(
            { roomJoinName, roomJoinPassword },
            handleCloseModal,
            handleError
          )}
        >
          <div className="SectionAnimation">
            <input
              type="text"
              name="roomJoinName"
              id="roomJoinName"
              autoComplete="off"
              value={roomJoinName}
              onChange={handleChange(setRoomJoinName)}
              required
            />
            <label className="RoomJoinNameLabel">
              <span className="RoomJoinNameContent">Room</span>
            </label>
          </div>
          <div className="SectionAnimation">
            <input
              type="password"
              name="roomJoinPassword"
              id="roomJoinPassword"
              value={roomJoinPassword}
              autoComplete="off"
              onChange={handleChange(setRoomJoinPassword)}
              required
            />
            <label className="RoomJoinPasswordLabel">
              <span className="RoomJoinPasswordContent">Password</span>
            </label>
          </div>
          {error && (
            <div className="ErrorJoinModal">
              <p className="JoinErrorText">{error}</p>
            </div>
          )}
          <button className="JoinButton" type="submit">
            Join
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinModal;
