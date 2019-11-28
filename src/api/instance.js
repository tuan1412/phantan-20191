import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://3.1.20.54/v1/',
});

export default instance;