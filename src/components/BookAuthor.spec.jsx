import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import BookAuthor from './BookAuthor';

Enzyme.configure({ adapter: new Adapter() });

describe('<BookAuthor />', () => {
  it('Should render properly', () => {
    const wrapper = shallow(<BookAuthor author="Gabriel Garcia Marquez" />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
