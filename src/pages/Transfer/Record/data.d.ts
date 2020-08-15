export interface TableListItem {
  id: number;
  client: string;
  accountName: string;
  date: Date;
  currency: string;
  amount: number;
  fromAccount: string;
  toAccount: string;
  status: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  id?: number;
  client?: string;
  accountName?: string;
  dateRange?: any;
  dateFrom?: Date;
  dateTo?: Date;
  currency?: string;
  amount?: number;
  fromAccount?: string;
  toAccount?: string;
  status?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
