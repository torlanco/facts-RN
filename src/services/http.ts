import axios from 'axios';

export default axios.create({
  baseURL: 'https://facts-cloud.herokuapp.com/',
  // baseURL: 'http://localhost:8000/',
  timeout: 2* 60 * 1000 // 2 min
});
