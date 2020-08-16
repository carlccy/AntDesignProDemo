import React from 'react';

import { mount } from 'enzyme';

import CreateForm from './CreateForm.tsx';

it('render ok', () => {
  const modalVisible = true;
  const onCancel = jest.fn();
  const wrapper = mount(<CreateForm modalVisible={modalVisible} onCancel={() => onCancel()} />);
  expect(wrapper.find('Modal').length).toBe(1);
  expect(wrapper.find('Modal').props().visible).toEqual(true);
  expect(wrapper.find('Modal').props().title).toEqual('Create');
  wrapper.find('.ant-modal-close').simulate('click');
  expect(onCancel).toBeCalled();
});
