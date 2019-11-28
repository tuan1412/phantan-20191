import React, { useState, useEffect } from 'react';
import { Layout as AntLayout, Drawer, Row, Col, Skeleton } from 'antd';
import ContentHeader from '../ContentHeader/ContentHeader';
import Slider from '../Slider';
import api from '../../api';

import './Layout.css';
import TaskCard from '../TaskCard/TaskCard';


const { Header, Content } = AntLayout;

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [size, setSize] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('processing');
  const [project, setProject] = useState(null);

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (project) return;
    setLoading(true);
    api.getTasksByMember({ userId: 5144140178259968, status })
      .then(({ data }) => {
        setLoading(false);
        setTasks(data.results)
      });
  }, [status, project]);

  useEffect(() => {
    if (project) {
      setLoading(true);
      api.getTasksByProject({ projectId: project.id })
        .then(({ data }) => {
          setLoading(false);
          setTasks(data.results)
        });
    }
  }, [project]);

  const isComputer = size > 500;

  function toogleSider() {
    setCollapsed(!collapsed);
  }

  function changeTask({ taskId, data }) {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) return task;
      return {
        ...task,
        ...data,
      }
    }).filter((task) => {
      if (status === 'processing' && task.percent_complete === 100) return false;
      if (status === 'completed' && task.percent_complete < 100) return false;
      return true;
    });
    setTasks(newTasks);
  }

  const contentStyle = {
    minHeight: '100vh',
    paddingLeft: !isComputer ? 'auto' : collapsed ? '84px' : '270px',
  };

  const headerStyle = {
    padding: '0px',
    width: !isComputer ? '100%' : collapsed ? 'calc(100% - 84px)' : 'calc(100% - 270px)',
  };

  const mapTaskToCard = (task) => (
    <Col xs={24} sm={24} md={8} key={task.id}>
      <TaskCard
        taskId={task.id}
        setProject={setProject}
        name={task.name}
        description={task.description}
        projectId={task.detail_project.id}
        projectName={task.detail_project.name}
        level={task.label}
        percentComplete={task.percent_complete}
        updatedTime={task.updated_time}
        completedTime={task.completed_time}
        deadline={task.deadline}
        status={task.status}
        changeTask={changeTask}
      />
    </Col>
  );


  return (
    <AntLayout>
      {isComputer
        ? <Slider collapsed={collapsed} />
        : (
          <Drawer
            visible={collapsed}
            onClose={() => setCollapsed(false)}
            placement="left"
          >
            <Slider></Slider>
          </Drawer>
        )}
      <AntLayout style={contentStyle}>
        <Header
          className="antd-pro-layouts-header-fixedHeader"
          style={headerStyle}
        >
          <ContentHeader
            project={project}
            setProject={setProject}
            toogleSider={toogleSider}
            collapsed={collapsed}
            status={status}
            setStatus={setStatus}
          />
        </Header>
        <Content className="antd-pro-layouts-basic-layout-content">
          <Row gutter={[16, 16]}>
            {
              loading
                ? <Skeleton />
                : tasks.map(mapTaskToCard)
            }

          </Row>
        </Content>
      </AntLayout>
    </AntLayout>
  )
}