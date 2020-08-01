import React, { useState, useContext } from 'react';

import Room from '../../contexts/RoomContext';
import './CreateModal.css';

function CreateModal(props) {
  const { createRoom } = useContext(Room);
  const [roomName, setRoomName] = useState('');
  const [roomPassword, setRoomPassword] = useState('');
  const [error, setError] = useState('');
  const { handleCloseModal } = props;

  const handleChange = (set) => (event) => set(event.target.value.trim());
  const handleError = (error) => setError(error);

  return (
    <div className="CreateModal">
      <div className="CreateModalMain">
        <form
          onSubmit={createRoom(
            { roomName, roomPassword },
            handleCloseModal,
            handleError
          )}
        >
          <div className="SectionAnimation">
            <input
              type="text"
              name="roomName"
              id="roomName"
              autoComplete="off"
              value={roomName}
              onChange={handleChange(setRoomName)}
              required
            />
            <label className="RoomNameLabel">
              <span className="RoomNameContent">Room</span>
            </label>
          </div>
          <div className="SectionAnimation">
            <input
              type="text"
              name="roomPassword"
              id="roomPassword"
              autoComplete="off"
              value={roomPassword}
              onChange={handleChange(setRoomPassword)}
              required
            />
            <label className="RoomPasswordLabel">
              <span className="RoomPasswordContent">Password</span>
            </label>
          </div>
          {error && (
            <div className="ErrorCreateModal">
              <p className="CreateErrorText">{error}</p>
            </div>
          )}
          <button className="CreateButton" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateModal;
