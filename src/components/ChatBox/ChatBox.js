import React from 'react';
import { useParams } from 'react-router-dom';

import './ChatBox.css';

function ChatBox(props) {
  let { id } = useParams();

  return <div className="ChatBox">{id}</div>;
}

export default ChatBox;
