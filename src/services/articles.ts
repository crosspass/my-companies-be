import { request } from 'umi';


export function save(article) {
  return request(`/api/articles`, {
    method: 'POST',
    body: JSON.stringify({content: article}),
  });
}

export function fetch(page=1) {
  return request(`/api/articles?page=${page}`);
}
