import React from 'react';
import { mount } from 'enzyme';

import '@/matchMedia.mock';
import Record from './index.tsx';

const wrapper = mount(<Record />);

it('render ok', () => {
  expect(wrapper.find('PageContainer').length).toBe(1);
  expect(wrapper.find('ProTable').length).toBe(1);
});

it('click create button', () => {
  wrapper.find('.ant-pro-table-toolbar button').simulate('click');
  expect(wrapper.find('CreateForm').length).toBe(1);
  expect(wrapper.find('CreateForm').props().modalVisible).toEqual(true);
});

// it('click edit button', () => {
//   expect(wrapper.find('tr').first().find('a').length).toBe(1);
//   wrapper.find('tr').first().find('a').simulate('click')
//   expect(wrapper.find('UpdateForm').length).toBe(1);
//   expect(wrapper.find('UpdateForm').props().modalVisible).toEqual(true);
// })
