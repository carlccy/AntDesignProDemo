import React from 'react';
import { shallow } from 'enzyme';

import UpdateForm from './UpdateForm.tsx';

it('render ok', () => {
  const wrapper = shallow(<UpdateForm modalVisible />);
  expect(wrapper.find('Modal').length).toBe(1);
  expect(wrapper.find('Modal').props().visible).toEqual(true);
  expect(wrapper.find('Modal').props().title).toEqual('Edit');
  // wrapper.find('.ant-modal-close').simulate('click');
  // expect(wrapper.find('Modal').length).toBe(0);
  // expect(wrapper.find('Modal').props().visible).toEqual(false);
});
