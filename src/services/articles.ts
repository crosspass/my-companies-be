import { request } from 'umi';


export function save(article) {
  return request(`/api/articles`, {
    method: 'POST',
    body: JSON.stringify(article),
  });
}

interface fetchParams {
  page: number;
  year: string
}

export function fetch(payload: fetchParams) {
  return request(`/api/articles?page=${payload.page}&year=${payload.year}`);
}

export function fetchOne(articleID:number) {
  return request(`/api/articles/${articleID}`);
}
