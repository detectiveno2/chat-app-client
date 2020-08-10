import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import roomsApi from '../api/roomsApi';
import RoomSocket from '../socket/room.socket';

const Room = React.createContext();
let socket;

export function RoomProvider(props) {
  const [rooms, setRooms] = useState([]);
  const [shownRoom, setShownRoom] = useState('');

  // Side effect
  useEffect(() => {
    // Connect socket
    socket = io(process.env.REACT_APP_SOCKET_URL);

    const fetchRoomsApi = async () => {
      try {
        const rooms = await roomsApi.get();
        setRooms(rooms);
        RoomSocket.connectRoom(socket, rooms);
      } catch (error) {
        window.alert('Something wrong, please try again.');
      }
    };

    fetchRoomsApi();
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  const getRoom = (id) => {
    const getRecentRoom = async () => {
      try {
        const shownRoom = await roomsApi.getRoom(id);
        setShownRoom(shownRoom);
      } catch (error) {
        console.log(error);
      }
    };

    getRecentRoom();
  };

  // Interact with room
  const createRoom = (data, cb, cbError) => (event) => {
    event.preventDefault();
    const postCreateRoom = async () => {
      try {
        const { rooms, createdRoom } = await roomsApi.postCreate(data);
        setRooms(rooms);
        RoomSocket.createRoom(socket, createdRoom);
        cb();
      } catch (error) {
        cbError(error);
      }
    };

    postCreateRoom();
  };

  const joinRoom = (data, cb, cbError) => (event) => {
    event.preventDefault();
    const postJoinRoom = async () => {
      try {
        const { rooms, updatedRoom } = await roomsApi.postJoin(data);
        setRooms(rooms);
        RoomSocket.joinRoom(socket, updatedRoom);
        cb();
      } catch (error) {
        console.log(error);
        cbError(error);
      }
    };

    postJoinRoom();
  };

  return (
    <Room.Provider
      value={{
        rooms,
        shownRoom,
        getRoom,
        createRoom,
        joinRoom,
        socket,
      }}
    >
      {props.children}
    </Room.Provider>
  );
}

export default Room;
