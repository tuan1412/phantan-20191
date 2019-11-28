import React from 'react';
import AvatarSider from '../AvatarSider/AvatarSider';
import { Layout } from 'antd';
import Menu from '../Menu';
import Scrollbar from 'react-scrollbars-custom';

const { Sider } = Layout;

const scrollbarStyle = {
  position: 'relative',
  width: '100 %',
  height: '100vh',
  paddingBottom: '200px',
  overflow: 'hidden',
};

export default function Slider({ collapsed }) {
  return (
    <Sider
      className="antd-pro-components-sider-menu-index-sider antd-pro-components-sider-menu-index-fixSiderBar antd-pro-components-sider-menu-index-light"
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={270}
      breakpoint="lg"
      collapsedWidth="82"
      defaultCollapsed={false}
    >
      <AvatarSider
        name="Nguyễn Anh Tuấn"
      />
      <Scrollbar style={scrollbarStyle}>
        <Menu />
      </Scrollbar>
      <Menu />
    </Sider>
  )
}
