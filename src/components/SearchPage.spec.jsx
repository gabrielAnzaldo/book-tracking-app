import React from 'react';
import { mount } from 'enzyme';
import SearchPage from './SearchPage';

describe('<SearchPage />', () => {
  let wrapper;
  beforeEach(() => {
    const fakeProps = {
      onAddBooksShelfs: jest.fn(),
      existingBooks: {
        currentlyReading: {
          shelfTitle: 'Currently Reading',
          shelfBooks: [],
          id: 0,
        },
        wantToRead: {
          shelfTitle: 'Want to Read',
          shelfBooks: [],
          id: 1,
        },
        read: {
          shelfTitle: 'Read',
          shelfBooks: [],
          id: 2,
        },
      },
    };
    wrapper = mount(<SearchPage {...fakeProps} />);
  });

  it('Should render properly', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('Should search for some books', () => {
    const componentInstance = wrapper.instance();
    const fakeEvent = { target: { value: 'androiid' } };
    componentInstance.onChangeSearchQuery(fakeEvent);
  });
});
