import React from 'react';
import { shallow , configure } from 'enzyme';

import EnzymeAdapter from 'enzyme-adapter-react-16';
import CreateForm from './CreateForm.tsx'

configure({ adapter: new EnzymeAdapter() });

it('render ok', () => {
  const wrapper = shallow(<CreateForm modalVisible/>);
  expect(wrapper.find('Modal').length).toBe(1);
  expect(wrapper.find('Modal').props().title).toEqual('Create');
})
