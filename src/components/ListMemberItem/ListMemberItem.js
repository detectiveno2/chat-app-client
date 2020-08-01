import React from 'react';

import './ListMemberItem.css';

function ListMemberItem(props) {
  const { member } = props;
  const { avatarUrl, userName } = member;

  return (
    <div className="ListMemberItem">
      <img src={avatarUrl} alt="avatar member" width="36" />
      <p>{userName}</p>
    </div>
  );
}

export default ListMemberItem;
