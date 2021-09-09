import { request } from 'umi';


export function save(article) {
  return request(`/api/articles`, {
    method: 'POST',
    body: JSON.stringify(article),
  });
}

export function update(article) {
  return request(`/api/articles/${article.ID}`, {
    method: 'PUT',
    body: JSON.stringify(article),
  });
}

export function markDeleted(articleID:number) {
  return request(`/api/articles/${articleID}`, {
    method: 'DELETE',
  });
}

interface fetchParams {
  page: number;
  year: string
}

export function fetch(payload: fetchParams) {
  return request(`/api/articles?page=${payload.page}&year=${payload.year}`);
}

export function stats(year:string) {
  return request(`/api/article/stats?year=${year}`);
}

export function fetchOne(articleID:number) {
  return request(`/api/articles/${articleID}`);
}
