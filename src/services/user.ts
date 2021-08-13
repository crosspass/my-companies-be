
import request from 'umi-request';

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