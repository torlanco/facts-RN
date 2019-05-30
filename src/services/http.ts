import axios from 'axios';

export const PARSE_CONFIG = {
  HOST: '',
  APPLICATION_ID: '',
  REST_API_KEY: '',
  MASTER_KEY: ''
};

export const isRequestToOurAPI = url => {
  url = url || '';
  const hasProtocol = /\:\/\//.test(url);
  const isSameDomain = RegExp(`^${PARSE_CONFIG.HOST}`).test(url);
  return !hasProtocol || isSameDomain;
};
function addHeaders(request) {
  if (isRequestToOurAPI(request.url)) {
    request.headers['Accept'] = 'application/json';
    request.headers['X-Parse-Application-Id'] = PARSE_CONFIG.APPLICATION_ID;
    request.headers['X-Parse-REST-API-Key'] = PARSE_CONFIG.REST_API_KEY;
  }
  return request;
}
function addDomain(request) {
  request.url = request.url || '';
  // if the url is not matching a protocol, assign the base URL
  if (!/\:\/\//.test(request.url) && typeof PARSE_CONFIG.HOST !== 'undefined') {
    const base = PARSE_CONFIG.HOST.replace(/\/$/, '');
    const url = request.url.replace(/^\//, '');
    request.url = `${base}/${url}`;
  }
  return request;
}
function parseResponseError(error) {
  if (error.response) return Promise.reject(error.response);
  return Promise.reject(error);
}

export const HTTP = axios.create({
  timeout: 60 * 1000 // 1 min
});
HTTP.interceptors.request.use(addDomain);
HTTP.interceptors.request.use(addHeaders);
HTTP.interceptors.response.use(undefined, parseResponseError);
