import { request } from 'umi';


export function save(article: string) {
  return request(`/api/articles`, {
    method: 'POST',
    body: JSON.stringify({content: article}),
  });
}

interface fetchParams {
  page: number;
  year: string
}

export function fetch(payload: fetchParams) {
  return request(`/api/articles?page=${payload.page}&year=${payload.year}`);
}
