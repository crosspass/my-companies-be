import { request } from 'umi';

export function roa(params) {
  return request(`/api/tops/roa?${new URLSearchParams(params).toString()}`);
}

export function roaIncrease(params) {
  return request(
    `/api/tops/roaIncrease?${new URLSearchParams(params).toString()}`,
  );
}

export function roe(params) {
  return request(`/api/tops/roe?${new URLSearchParams(params).toString()}`);
}

export function roeIncrease(params) {
  return request(
    `/api/tops/roeIncrease?${new URLSearchParams(params).toString()}`,
  );
}
