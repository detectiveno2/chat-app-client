import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './RecentRoomItem.css';

function RecentRoomItem(props) {
  const { idRoom, roomName, isSelected, handleSelect } = props;
  const classNameRoomItem = classNames('RecentRoomItem', {
    select: isSelected,
  });

  return (
    <div className={classNameRoomItem}>
      <Link
        onClick={handleSelect(roomName, idRoom)}
        to={`/messages/g/${idRoom}`}
      >
        {roomName}
      </Link>
    </div>
  );
}

export default RecentRoomItem;
