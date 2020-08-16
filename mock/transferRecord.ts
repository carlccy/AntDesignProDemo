// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { parse } from 'url';
import { TableListItem, TableListParams } from '@/pages/Transfer/Record/data';

// mock tableListDataSource
export const genList = (current: number, pageSize: number) => {
  const tableListDataSource: TableListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      id: index,
      client: ['Vast', 'Mr Wang', 'Mrs Zhang'][i % 3],
      accountName: ['LAIS SCIENCE...', 'LOFTY TECH...', 'MANCHURIAN TIGER...'][i % 3],
      date: new Date(),
      currency: ['HKD', 'USD', 'EUR'][i % 3],
      amount: Math.floor(Math.random() * 1000),
      fromAccount: ['BOS:123456', 'UBS SG:2123', 'JPM:412312'][i % 3],
      toAccount: ['VP:123456', 'UOB: 222132', 'CICC: 412312'][i % 3],
      status: i % 3,
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

export function getRecord(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = (parse(realUrl, true).query as unknown) as TableListParams;

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );

  if (params.id) {
    dataSource = dataSource.filter((data) => String(data.id).includes(String(params.id) || ''));
  }
  if (params.client) {
    dataSource = dataSource.filter((data) => data.client.includes(params.client || ''));
  }
  if (params.status) {
    dataSource = dataSource.filter((data) => data.status === Number(params.status));
  }
  if (params.dateFrom && params.dateTo) {
    dataSource = dataSource.filter(
      (data) =>
        new Date(data.date) > new Date(String(params.dateFrom)) &&
        new Date(data.date) < new Date(String(params.dateTo)),
    );
  }
  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };

  return res.json(result);
}

function postRecord(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, id, ...rest } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter((item) => id.indexOf(item.id) === -1);
      break;
    case 'post':
      (() => {
        // const i = Math.ceil(Math.random() * 10000);
        const newRecord = {
          id: tableListDataSource.length,
          date: new Date(),
          status: 0,
          ...rest,
        };
        tableListDataSource.unshift(newRecord);
        return res.json(newRecord);
      })();
      return;

    case 'update':
      (() => {
        let newRecord = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.id === id * 1) {
            newRecord = { ...item, ...rest };
            return { ...item, ...rest };
          }
          return item;
        });
        return res.json(newRecord);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/record': getRecord,
  'POST /api/record': postRecord,
};
