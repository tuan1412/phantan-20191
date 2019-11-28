import React from 'react';
import { Badge, Avatar, Icon } from 'antd';

const avatarStyle = {
  fontSize: '18px',
  cursor: 'pointer',
}

export default function AvatarSider({ name }) {
  return (
    <div className="antd-pro-components-sider-menu-index-AvantProfile">
      <div className="antd-pro-components-sider-menu-index-AvantAvatar">
        <Badge count={1}>
          <Avatar icon="user" size={55} style={avatarStyle} />
        </Badge>
      </div>
      <div>
        <h1>{name}</h1>
        <ul>
          <li>
            <a href="/dashboard" rel="noopener noreferrer">
              <Icon type="setting" />
            </a>
          </li>
          <li>
            <a href="/dashboard" rel="noopener noreferrer">
              <Icon type="user" />
            </a>
          </li>
          <li>
            <a href="/dashboard" rel="noopener noreferrer">
              <Icon type="logout" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}