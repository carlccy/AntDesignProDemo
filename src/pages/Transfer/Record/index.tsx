import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { TableListItem, TableListParams } from './data.d';
import { queryRecord, updateRecord, addRecord, removeRecord } from './service';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRecord({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: TableListItem) => {
  const hide = message.loading('正在修改');
  try {
    await updateRecord({
      id: fields.id,
      client: fields.client,
      accountName: fields.accountName,
      date: fields.date,
      currency: fields.currency,
      amount: fields.amount,
      fromAccount: fields.fromAccount,
      toAccount: fields.toAccount,
      status: fields.status,
    });
    hide();

    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRecord({
      id: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [updateFormValues, setUpdateFormValues] = useState<TableListParams>({});
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Record ID',
      dataIndex: 'id',
      hideInForm: true
    },
    {
      title: 'Client',
      dataIndex: 'client',
      rules: [
        {
          required: true,
          message: 'Client required',
        },
      ],
    },
    {
      title: 'Account Name',
      dataIndex: 'accountName',
      hideInSearch: true,
      renderText: (val: string) => `+ ${val}`,
      rules: [
        {
          required: true,
          message: 'Account Name required',
        },
      ],
    },
    {
      title: 'Date',
      dataIndex: 'date',
      valueType: 'date',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: 'Date Range',
      dataIndex: 'dateRange',
      valueType: 'dateRange',
      hideInForm: true,
      hideInTable: true
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: 'Currency required',
        },
      ],
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: 'Amount required',
        },
      ],
    },
    {
      title: 'From Account',
      dataIndex: 'fromAccount',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: 'From Account required',
        },
      ],
    },
    {
      title: 'To Account',
      dataIndex: 'toAccount',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: 'To Account required',
        },
      ],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: { text: 'Processing', status: 0 },
        1: { text: 'Finished', status: 1 },
        2: { text: 'Canceled', status: 2 },
      },
    },
    {
      title: 'Action',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          {record.status === 0 ? (
            <a
              onClick={() => {
                setUpdateFormValues(record);
                handleUpdateModalVisible(true);
              }}
            >
              Edit
            </a>
          ): (<a href="">View</a>)}
          <Divider type="vertical" />
          {record.status === 0 ? (<a href="">DownLoad</a>) : null}
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        // headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleCreateModalVisible(true)}>
            <PlusOutlined /> Create New
          </Button>,
        ]}
        request={(params, sorter, filter) => {
          if (params.dateRange) {
            params.dateFrom = params.dateRange[0].toDate()
            params.dateTo = params.dateRange[1].toDate()
            delete params.dateRange
          }
          return queryRecord({ ...params, sorter, filter })
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows)
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reload();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <CreateForm onCancel={() => handleCreateModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleCreateModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          request={() => []}
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>
      <UpdateForm onCancel={() => handleUpdateModalVisible(false)} modalVisible={updateModalVisible}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleUpdate({
              id: updateFormValues.id,
              ...value
            });
            if (success) {
              handleUpdateModalVisible(false);
              setUpdateFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
          request={() => []}
          form={{initialValues: updateFormValues}}
          rowSelection={{}}
        />
      </UpdateForm>
    </PageContainer>
  );
};

export default TableList;
