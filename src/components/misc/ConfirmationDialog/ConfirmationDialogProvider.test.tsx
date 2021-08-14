import React from 'react';
import { Button, View } from 'react-native';
import ConfirmationDialogProvider, {
  useConfirmationDialog
} from './ConfirmationDialogProvider';
import { fireEvent, render } from '@testing-library/react-native';

interface Props {
  onPress(): void;
  confirmText: string;
}

const TestComponent = ({ onPress, confirmText }: Props) => {
  const { withConfirmation } = useConfirmationDialog();

  return (
    <View>
      <Button
        title="Get confirmation"
        onPress={withConfirmation!(onPress, {
          confirmText
        })}
      />
    </View>
  );
};

it('shows dialog and requires confirmation', () => {
  const pressHandler = jest.fn();

  const confirmText = 'Confirm';

  const { getByText } = render(
    <ConfirmationDialogProvider>
      <TestComponent onPress={pressHandler} confirmText={confirmText} />
    </ConfirmationDialogProvider>
  );

  fireEvent.press(getByText('Get confirmation'));

  expect(pressHandler).not.toHaveBeenCalled();

  fireEvent.press(getByText(confirmText));

  expect(pressHandler).toHaveBeenCalled();
});
