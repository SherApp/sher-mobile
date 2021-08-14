import { View } from 'react-native';
import Dialog from 'react-native-dialog';
import Typography from '../Typography';
import React from 'react';
import useTheme from '../../../theme/useTheme';
import { commonStyles } from '../../../utils/commonStyles';

export interface ConfirmationDialogProps {
  title?: string;
  visible?: boolean;
  onClose(confirmed: boolean): void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationDialog = ({
  title,
  visible,
  onClose,
  confirmText = 'Yes',
  cancelText = 'No'
}: ConfirmationDialogProps) => {
  const handleCancelPress = () => {
    onClose(false);
  };

  const handleConfirmPress = () => {
    onClose(true);
  };

  const { colors } = useTheme();

  return (
    <View>
      <Dialog.Container
        visible={visible}
        contentStyle={{ backgroundColor: colors.card }}
      >
        <Dialog.Title>
          <Typography>{title}</Typography>
        </Dialog.Title>
        <Dialog.Button
          label={cancelText}
          onPress={handleCancelPress}
          color={colors.primary}
          style={commonStyles.font}
        />
        <Dialog.Button
          label={confirmText}
          onPress={handleConfirmPress}
          color={colors.primary}
          style={commonStyles.font}
        />
      </Dialog.Container>
    </View>
  );
};

export default ConfirmationDialog;
