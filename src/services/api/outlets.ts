import { HTTP } from '../http';

export const fetchOutlets = () => {
  return HTTP.get('http://www.outlets.com');
};