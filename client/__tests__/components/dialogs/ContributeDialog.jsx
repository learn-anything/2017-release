import React from 'react';
import { shallow, mount, render } from 'enzyme';

import ContributeDialog from 'components/dialogs/ContributeDialog';

describe('components - ContributeDialog', () => {
  let dismiss;
  let dialog;

  beforeEach(() => {
    dismiss = jest.fn();

    dialog = (
      <ContributeDialog
        onReject={dismiss}
        visible={true}
        title="path - to - map"
      />
    );
  });


  it('should render without throwing errors', () => {
    const wrapper = mount(dialog);

    expect(wrapper.find('.dialog-title').length).toBe(1);
    expect(wrapper.find('.dialog-title').text()).toBe('contribute_dialog_title');

    expect(wrapper.find('.contribute-dialog').length).toBe(1);
    expect(wrapper.find('.contribute-dialog').text()).toBe('contribute_dialog_message');
  });


  it('should call onAccept when clicking accept', () => {
    const wrapper = mount(dialog);

    global.open = jest.fn(openMock);
    expect(open.mock.calls.length).toBe(0);
    expect(dismiss.mock.calls.length).toBe(0);

    // Click on accept button.
    wrapper.find('.dialog-footer--accept').simulate('click');

    expect(open.mock.calls.length).toBe(1);
    expect(dismiss.mock.calls.length).toBe(0);
  });

  it('should not call onAccept when pressing Enter', () => {
    const wrapper = mount(dialog);

    global.open = jest.fn(openMock);
    expect(open.mock.calls.length).toBe(0);
    expect(dismiss.mock.calls.length).toBe(0);

    // Keypress Enter
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    document.dispatchEvent(event);

    expect(open.mock.calls.length).toBe(0);
    expect(dismiss.mock.calls.length).toBe(0);
  });
});
