import { HTTP } from '../http';

export const fetchOutlets = () => {
  return HTTP.get('https://facts-cloud.herokuapp.com/outlets');
};