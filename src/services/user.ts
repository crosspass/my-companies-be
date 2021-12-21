
import request from 'umi-request';
import {getToken} from '../utils/localdb'

export function login(values) {
  return request('/api/users/login', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function register(values) {
  return request('/api/users/register', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function starCompany(values) {
  return request('/api/users/starCompany', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function info() {
  const token = getToken()
  return request('/api/user/info', {
    method: 'get',
    headers: {
      'Token': token
    }
  });
}