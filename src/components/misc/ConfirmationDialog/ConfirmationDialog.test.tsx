import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ConfirmationDialog from './ConfirmationDialog';

it('calls onClose with false on cancel press', () => {
  const closeHandler = jest.fn();
  const cancelText = 'Cancel';

  const { getByText } = render(
    <ConfirmationDialog
      onClose={closeHandler}
      cancelText={cancelText}
      visible
    />
  );

  fireEvent.press(getByText(cancelText));

  expect(closeHandler).toHaveBeenCalledWith(false);
});

it('calls onClose with true on confirm press', () => {
  const closeHandler = jest.fn();
  const confirmText = 'Delete';

  const { getByText } = render(
    <ConfirmationDialog
      onClose={closeHandler}
      confirmText={confirmText}
      visible
    />
  );

  fireEvent.press(getByText(confirmText));

  expect(closeHandler).toHaveBeenCalledWith(true);
});
