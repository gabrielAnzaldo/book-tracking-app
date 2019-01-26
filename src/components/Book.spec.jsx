import React from 'react';
import { shallow } from 'enzyme';
import Book from './Book';

describe('<Book />', () => {
  it('Should render properly', () => {
    const wrapper = shallow(<Book />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('Should have more than two authors', () => {
    const fakeAuthors = ['lebron james', 'kobe bryant'];
    const fakeImageLinks = { smallThumbnail: 'an awesome image link' };
    const wrapper = shallow(<Book authors={fakeAuthors} imageLinks={fakeImageLinks} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
