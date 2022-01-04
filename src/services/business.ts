import { request } from 'umi';

import { PAGE_SIZE } from '../constants';

export function fetch(query: { page: number }) {
  return request(`/api/businesses?_page=${query.page}&_limit=${PAGE_SIZE}`);
}

export function create(values: {
  name: string;
  description: string;
  company_ids: Array<any>;
}) {
  return request('/api/businesses', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function remove(id: number) {
  return request(`/api/companies/${id}`, {
    method: 'DELETE',
  });
}

export function fetchBusiness(id: string) {
  return request(`/api/businesses/${id}`);
}

export function fetchBusinessStats(id: string) {
  return request(`/api/businesses/${id}/stats`);
}

export function articles(code: string) {
  return request(`/api/companies/${code}/articles`);
}
