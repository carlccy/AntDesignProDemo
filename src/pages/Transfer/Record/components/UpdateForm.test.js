import React from 'react';
import { mount } from 'enzyme';

import UpdateForm from './UpdateForm.tsx';

it('render ok', () => {
  const modalVisible = true;
  const onCancel = jest.fn();
  const wrapper = mount(<UpdateForm modalVisible={modalVisible} onCancel={() => onCancel()} />);
  expect(wrapper.find('Modal').length).toBe(1);
  expect(wrapper.find('Modal').props().visible).toEqual(true);
  expect(wrapper.find('Modal').props().title).toEqual('Edit');
  wrapper.find('.ant-modal-close').simulate('click');
  expect(onCancel).toBeCalled();
});
