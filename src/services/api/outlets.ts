import { PARSE_CONFIG, HTTP } from '../http';
import qs from 'qs';

export const fetchOutlets = () => {
  return HTTP.get('http://www.outlets.com');
};