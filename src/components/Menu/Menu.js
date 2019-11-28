import React from 'react';
import { Menu as AntMenu, Icon } from 'antd';

const { SubMenu, Item } = AntMenu;

const styleMenu = {
  padding: '0px 0px 100%',
  width: '100%',
  height: 'auto',
  overflow: 'hidden',
}

export default function Menu() {
  return (
    <AntMenu
      style={styleMenu}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['cong-viec']}
      mode="inline"
    >
      <SubMenu
        key="cong-viec"
        title={
          <span>
            <Icon type="container" />
            <span>Công việc</span>
          </span>
        }
      >
        <Item key="1">Theo dự án</Item>
        <Item key="2">Thường xuyên</Item>
        <Item key="3">Theo quy trình</Item>
      </SubMenu>
      <Item
        key="bao-cao"
      >
        <a href="/bao-cao">
          <Icon type="file-text" />
          <span>Báo cáo</span>
        </a>
      </Item>
      <Item
        key="chat"
      >
        <a href="/chat">
          <Icon type="message" />
          <span>Chat</span>
        </a>
      </Item>
    </AntMenu>
  );
}