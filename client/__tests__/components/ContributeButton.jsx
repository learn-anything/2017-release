import React from 'react';
import { shallow, mount, render } from 'enzyme';

import ContributeButton from 'components/ContributeButton';

describe('components - ContributeButton', () => {
  let button;

  beforeEach(() => {
    button = (<ContributeButton title="path - to - map" />);
  });


  it('should render without throwing errors', () => {
    const wrapper = mount(button);

    expect(wrapper.find('.contribute-button').length).toBe(1);

    expect(wrapper.find('.contribute-button-text').length).toBe(1);
    expect(wrapper.find('.contribute-button-text').text()).toBe('contribute_button_text');
  });


  it('should set contributeDialog to true when clicked', () => {
    const wrapper = mount(button);

    expect(wrapper.state().contributeDialog).toBe(false);
    wrapper.find('.contribute-button').simulate('click');
    expect(wrapper.state().contributeDialog).toBe(true);
  });
});
