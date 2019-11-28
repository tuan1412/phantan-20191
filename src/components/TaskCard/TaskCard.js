import React, { useState } from 'react';
import { Card, Icon, Progress, Tag } from 'antd';
import ModalViewTask from '../ModalViewTask';
import ModalEditTask from '../ModalEditTask/ModalEditTask';
import api from '../../api';

const styleDescription = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}

const mapLevelToColor = {
  'HIGH': '#dc3545',
  'MEDIUM': '#d39e00',
  'LOW': '#1e7e34',
}

export default function TaskCard({
  name,
  description,
  level,
  projectName,
  projectId,
  percentComplete,
  setProject,
  updatedTime,
  completedTime,
  deadline,
  status,
  taskId,
  changeTask,
}) {
  const completedTask = () => {
    setLoading(true);
    api.updateTask({
      taskId,
      data: {
        percent_complete: 100
      }
    }).then(() => {
      setLoading(false);
      changeTask({
        taskId,
        data: {
          percent_complete: 100
        }
      })
    })
  }

  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const viewProject = () => setProject({ id: projectId, name: projectName });

  const actions = [
    percentComplete !== 100 ? !loading ? <Icon type="check-circle" onClick={completedTask} /> : <Icon type="loading" /> : false,
    <Icon type="edit" onClick={() => setVisibleEdit(true)} />,
    <Icon type="eye" onClick={() => setVisible(true)} />,
  ].filter(action => action);

  return (
    <>
      <Card
        hoverable
        title={name}
        extra={<Tag color={mapLevelToColor[level]}>{level}</Tag>}
        actions={actions}
      >
        <p style={styleDescription}>{description}</p>
        <p onClick={viewProject}><Icon type="folder" /> {projectName}</p>
        <div style={{ display: 'flex' }}>
          <Icon type="hourglass" />
          <Progress
            percent={percentComplete}
            size="small"
            style={{ marginLeft: 4 }}
          />
        </div>
      </Card>
      <ModalViewTask
        name={name}
        description={description}
        percentComplete={percentComplete}
        visible={visible}
        level={level}
        status={status}
        projectName={projectName}
        updatedTime={updatedTime}
        completedTime={completedTime}
        deadline={deadline}
        onCancel={() => setVisible(false)}
      />
      <ModalEditTask
        changeTask={changeTask}
        taskId={taskId}
        name={name}
        visible={visibleEdit}
        percentComplete={percentComplete}
        description={description}
        onCancel={() => setVisibleEdit(false)}
      />
    </>

  )
}