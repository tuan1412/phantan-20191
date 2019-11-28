import React from 'react';
import { Modal } from 'antd';

export default function ModalViewTask({
  name,
  description,
  percentComplete,
  deadline,
  level,
  updatedTime,
  completedTime,
  status,
  visible,
  onCancel,
  projectName,
}) {
  const convertDate = (timestamp) => new Date(timestamp * 1000).toLocaleDateString();
  return (
    <Modal
      title={name}
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <p>Tên task: {name}</p>
      <p>Mô tả: {description}</p>
      <p>Độ khó: {level}</p>
      <p>Sửa lần cuối: {convertDate(updatedTime)}</p>
      <p>Trạng thái: {status}</p>
      {completedTime && convertDate(completedTime)}
      <p>Deadline: {convertDate(deadline)}</p>
      <p>Độ hoàn thành: {percentComplete}</p>
      <p>Tên project: {projectName}</p>
    </Modal>
  )
}