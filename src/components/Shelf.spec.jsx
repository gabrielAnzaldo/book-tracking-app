import React from 'react';
import { shallow } from 'enzyme';
import Shelf from './Shelf';

describe('Shelf', () => {
  it('Should render properly', () => {
    const fakeProps = {
      keyShelf: 'currentlyReading',
      shelfData: {
        shelfTitle: 'Currently Reading',
        shelfBooks: [],
        id: 0,
      },
      onChangeShelf: jest.fn(),
    };
    const wrapper = shallow(<Shelf {...fakeProps} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
