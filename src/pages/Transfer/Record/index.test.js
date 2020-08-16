import React from 'react';
import { mount } from 'enzyme';
// import { act } from "react-dom/test-utils";

import '@/matchMedia.mock';
// eslint-disable-next-line import/no-unresolved
import { genList } from '@mock/transferRecord';

// updateRecord, addRecord, removeRecord
import { queryRecord } from './service';

import Record from './index.tsx';

jest.mock('./service', () => ({ queryRecord: jest.fn() }));
queryRecord.mockImplementation(() => Promise.resolve(genList(1, 10)));

describe('record index test', () => {
  let wrapper;
  beforeEach(async () => {
    wrapper = await mount(<Record />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('record render ok', () => {
    expect(wrapper.find('PageContainer').length).toBe(1);
    expect(wrapper.find('ProTable').length).toBe(1);
  });

  it('click create button', () => {
    wrapper.find('.ant-pro-table-toolbar button').simulate('click');
    expect(wrapper.find('CreateForm').length).toBe(1);
    expect(wrapper.find('CreateForm').props().modalVisible).toEqual(true);
  });

  it('click edit button', () => {
    // wrapper.find('ProTable').setState({dataSource: genList()})
    expect(wrapper.find('tr').length).toBeGreaterThanOrEqual(2);
    // wrapper.find('tr').at(1).find('a').simulate('click')
    // expect(wrapper.find('UpdateForm').length).toBe(1);
    // expect(wrapper.find('UpdateForm').props().modalVisible).toEqual(true);
  });
});
