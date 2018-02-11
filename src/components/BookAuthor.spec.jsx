import { shallow } from 'enzyme';
import React from 'react';
import BookAuthor from './BookAuthor';

describe('<BookAuthor />', () => {
  it('Should render properly', () => {
    const wrapper = shallow(<BookAuthor author="Gabriel Garcia Marquez" />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
