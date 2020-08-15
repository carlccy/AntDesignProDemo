import React from 'react';
import { shallow } from 'enzyme';

import CreateForm from './CreateForm.tsx';

it('render ok', () => {
  const wrapper = shallow(<CreateForm modalVisible />);
  expect(wrapper.find('Modal').length).toBe(1);
  expect(wrapper.find('Modal').props().visible).toEqual(true);
  expect(wrapper.find('Modal').props().title).toEqual('Create');
  // wrapper.find('.ant-modal-close').simulate('click');
  // expect(wrapper.find('Modal').length).toBe(0);
  // expect(wrapper.find('Modal').props().visible).toEqual(false);
});
