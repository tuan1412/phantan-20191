import React, { useState } from 'react';
import { Modal, Input, InputNumber, Button } from 'antd';
import api from '../../api';

const { TextArea } = Input;

export default function ModalEditTask({
  name,
  visible,
  onCancel,
  description,
  percentComplete,
  taskId,
  changeTask,
}) {
  const [des, setDes] = useState(description);
  const [percent, setPercent] = useState(percentComplete);
  const [loading, setLoading] = useState(false);

  function onOk() {
    setLoading(true);
    const data = {
      description: des,
      percent_complete: percent,
    }
    api.updateTask({
      taskId,
      data,
    }).then(() => {
      setLoading(false);
      onCancel();
      changeTask({ taskId: taskId, data })
    })
  }

  return (
    <Modal
      title={name}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={onOk}>
          Ok
        </Button>,
      ]}
    >
      <p>Mô tả</p>
      <TextArea
        defaultValue={description}
        onChange={(e) => setDes(e.target.value)}
      />
      <p>Độ hoàn thành</p>
      <InputNumber
        min={0}
        max={100}
        defaultValue={percentComplete}
        onChange={(val) => setPercent(val)}
      />
    </Modal>
  )
}
