import request from '@/utils/request';
import { TableListParams, TableListItem } from './data';

export async function queryRecord(params?: TableListParams) {
  return request('/api/record', {
    params,
  });
}

export async function removeRecord(params: { id: number[] }) {
  return request('/api/record', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRecord(params: TableListItem) {
  return request('/api/record', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRecord(params: TableListItem) {
  return request('/api/record', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
