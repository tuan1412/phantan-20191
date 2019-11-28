import React from 'react';
import { Breadcrumb, Icon, Avatar, Dropdown, Menu } from 'antd';
import { Circle, ToggleRight, ToggleLeft, } from 'react-feather';

export default function ContentHeader({ toogleSider, collapsed, status, setStatus, project, setProject }) {
  const propsToogle = {
    size: 26,
    onClick: toogleSider,
  };

  const styleIcon = {
    background: 'rgba(235, 238, 243, 0.5)',
    color: 'rgb(120, 135, 169)',
  };

  const menu = (
    <Menu selectedKeys={[status]}>
      <Menu.Item key={'completed'} onClick={() => setStatus('completed')}>
        <span>Complete</span>
      </Menu.Item>
      <Menu.Item key={'processing'} onClick={() => setStatus('processing')}>
        <span>Uncomplete</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="antd-pro-components-global-header-index-header">
      <span className="antd-pro-components-global-header-index-trigger">
        {collapsed ? <ToggleLeft {...propsToogle} /> : <ToggleRight {...propsToogle} />}
      </span>
      <Breadcrumb
        separator={<Circle size={8} />}
      >
        <Breadcrumb.Item>
          <Icon type="home" />
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => {setProject(null); setStatus('processing')}}>
          <span>Tasks</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span>{project ? project.name : status === 'completed' ? 'Completed' : 'Uncompleted'}</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="antd-pro-components-global-header-index-right">
        <Dropdown overlay={menu} placement="bottomRight">
          <span className="antd-pro-components-select-lang-index-dropDown antd-pro-components-global-header-index-action ant-dropdown-trigger">
            <Avatar icon="filter" style={styleIcon} />
          </span>
        </Dropdown>
      </div>
    </div>
  )
}