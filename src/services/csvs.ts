import { request } from 'umi';

export function fetch(query: { code: string }) {
  return request(`/api/csvs?code=${query.code}`);
}

export function fetchOne(articleID:number) {
  return request(`/api/articles/${articleID}`);
}
