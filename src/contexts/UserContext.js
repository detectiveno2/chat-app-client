import React, { useState, useEffect, useContext } from 'react';

import authApi from '../api/authApi';
import RoomSocket from '../socket/room.socket';
import Room from '../contexts/RoomContext';

const User = React.createContext();

export function UserProvider(props) {
  const { socket } = useContext(Room);
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const user = await authApi.get();
        setUser(user);
        if (socket) RoomSocket.connectPersonalRoom(socket, user._id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInformation();
  }, [socket]);

  return <User.Provider value={{ user }}>{props.children}</User.Provider>;
}

export default User;
