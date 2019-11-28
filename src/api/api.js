import axios from './instance';

export default {
  getTasksByMember({ userId, status = 'processing' }) {
    return axios({
      url: '/tasks',
      method: 'GET',
      params: {
        user_id: userId,
        status,
      },
    })
  },
  getTasksByProject({ projectId }) {
    return axios({
      url: '/tasks',
      method: 'GET',
      params: {
        project_id: projectId,
      },
    })
  },
  updateTask({ taskId, data }) {
    return axios({
      url: `/tasks/${taskId}`,
      method: 'PUT',
      data,
    })
  }
}