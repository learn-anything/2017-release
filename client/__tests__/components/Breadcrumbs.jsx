import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Breadcrumbs from 'components/Breadcrumbs';

describe('components - Breadcrumbs', () => {
  let onCrumbClick;
  let breadcrumbs;

  beforeEach(() => {
    onCrumbClick = jest.fn();

    breadcrumbs = (
      <Breadcrumbs
        title="path - to - map"
        onCrumbClick={onCrumbClick}
      />
    );
  });


  it('should render without throwing errors', () => {
    const wrapper = mount(breadcrumbs);

    expect(wrapper.find('span').length).toBe(3);
    expect(wrapper.find('.breadcrumbs').length).toBe(1);

    expect(wrapper.find('.breadcrumbs').text()).toBe('pathtomap');
  });


  it('should call onCrumbClick when clicking topic', () => {
    const wrapper = mount(breadcrumbs);
    const expectedCalls = [
      ['path'],
      ['path/to'],
      ['path/to/map'],
    ];

    expect(onCrumbClick.mock.calls.length).toBe(0);

    // Click on topics.
    wrapper.find('span').at(0).simulate('click');
    wrapper.find('span').at(1).simulate('click');
    wrapper.find('span').at(2).simulate('click');

    expect(onCrumbClick.mock.calls.length).toBe(3);
    expect(onCrumbClick.mock.calls).toEqual(expectedCalls);
  });
});
