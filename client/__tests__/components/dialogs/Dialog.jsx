import React from 'react';
import { shallow, mount } from 'enzyme';

import Dialog from 'components/dialogs/Dialog';

describe('components - Dialog', () => {
  let dialog;

  beforeEach(() => {
    dialog = (
      <Dialog hasFooter={false} title="this is the title">
        and here goes some message
      </Dialog>
    );
  });

  it('should render without throwing errors', () => {
    const expectedHTML = [
      <div className="dialog-title">this is the title</div>,
      <div className="dialog-body">and here goes some message</div>,
    ];

    expect(shallow(dialog).contains(expectedHTML)).toBe(true);
  });

  it('should be selectable by class "dialog-container" and "dialog-container--centered"', () => {
    expect(shallow(dialog).is('.dialog-container')).toBe(true);
    expect(shallow(dialog).is('.dialog-container--centered')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(dialog).find('.dialog-container').length).toBe(1);
  });


  it('should call onAccept when clicking accept or pressing enter', () => {
    const accept = jest.fn();
    const reject = jest.fn();

    const customDialog = (<Dialog onAccept={accept} onReject={reject} acceptOnEnterPress={true} />);
    const wrapper = mount(customDialog);

    expect(accept.mock.calls.length).toBe(0);
    expect(reject.mock.calls.length).toBe(0);

    // Click on accept button.
    wrapper.find('.dialog-footer--accept').simulate('click');

    // Keypress Enter
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    document.dispatchEvent(event);

    expect(accept.mock.calls.length).toBe(2);
    expect(reject.mock.calls.length).toBe(0);
  });

  it('should not call onAccept when pressing enter', () => {
    const accept = jest.fn();
    const reject = jest.fn();

    const customDialog = (<Dialog onAccept={accept} onReject={reject} />);
    const wrapper = mount(customDialog);

    expect(accept.mock.calls.length).toBe(0);
    expect(reject.mock.calls.length).toBe(0);

    // Keypress Enter
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    document.dispatchEvent(event);

    expect(accept.mock.calls.length).toBe(0);
    expect(reject.mock.calls.length).toBe(0);
  });

  it('should call onReject when clicking reject, outside the dialog, or pressing escape', () => {
    const accept = jest.fn();
    const reject = jest.fn();

    const customDialog = (<Dialog onAccept={accept} onReject={reject} />);
    const wrapper = mount(customDialog);

    expect(accept.mock.calls.length).toBe(0);
    expect(reject.mock.calls.length).toBe(0);

    // Click on reject button.
    wrapper.find('.dialog-footer--reject').simulate('click');
    wrapper.find('.dialog-container').simulate('click');

    // Keypress Escape
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);

    expect(accept.mock.calls.length).toBe(0);
    expect(reject.mock.calls.length).toBe(3);
  });
});
