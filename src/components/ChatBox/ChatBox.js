import React, { useContext, useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Room from '../../contexts/RoomContext';
import User from '../../contexts/UserContext';
import messagesApi from '../../api/messagesApi';
import roomsApi from '../../api/roomsApi';
import TextMessage from '../TextMessage/TextMessage';

import './ChatBox.css';

function ChatBox() {
  const { shownRoom, socket } = useContext(Room);
  const { user } = useContext(User);
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      // First condition.
      if (!shownRoom) return;

      // Get member and define function.
      const members = await roomsApi.getMemberOnRoom(shownRoom._id);
      const convertToNewMessages = (messages) => {
        messages.forEach((mess) => {
          for (const member of members) {
            if (mess.author === member._id) {
              mess.author = member.userName;
              mess.avatarUrl = member.avatarUrl;
            }
          }
        });
        return messages;
      };

      // Socket io handler.
      if (socket) {
        socket.on('replySendMessage', ({ messages }) => {
          const newMessages = convertToNewMessages(messages);
          setMessages(newMessages);
        });

        socket.on('replyJoinRoom', ({ messages }) => {
          const newMessages = convertToNewMessages(messages);
          setMessages(newMessages);
        });
      }

      // Set messages.
      const newMessages = convertToNewMessages(shownRoom.messages);
      setMessages(newMessages);
    };

    fetchMessages();
  }, [shownRoom, socket]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const sendMessagesApi = async () => {
      messagesApi.sendMessages({
        content,
        idRoom: shownRoom._id,
        idSender: user._id,
      });
      setContent('');
    };

    sendMessagesApi();
  };

  return shownRoom ? (
    <div className="ChatBox">
      <ScrollToBottom className="ChatBoxContent">
        {messages.map((mess) => (
          <TextMessage key={mess._id} mess={mess} />
        ))}
      </ScrollToBottom>

      <div className="ChatBoxInput">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="content"
            placeholder="Type something to send..."
            autoComplete="off"
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default ChatBox;
