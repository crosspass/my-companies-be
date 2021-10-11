import { request } from 'umi';

export function fetch(query: { code: string }) {
  return request(`/api/csvs?code=${query.code}`);
}

export function fetchOne(articleID: number) {
  return request(`/api/articles/${articleID}`);
}
interface CsvParams{
  code: string,
  csvID?: number,
  title: string,
  chartType: string,
  data: Array<any>
}
export function save(payload: CsvParams) {
  return request('/api/csvs', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
