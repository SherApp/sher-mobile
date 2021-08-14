import React, { useState } from 'react';
import ConfirmationDialog, {
  ConfirmationDialogProps
} from './ConfirmationDialog';

type ConfirmationProps = Omit<ConfirmationDialogProps, 'onClose' | 'visible'>;

interface ConfirmationDialogContextType {
  withConfirmation?(func: () => any, props: ConfirmationProps): () => void;
}

const ConfirmationDialogContext = React.createContext<ConfirmationDialogContextType>(
  {}
);

export const useConfirmationDialog = () =>
  React.useContext(ConfirmationDialogContext);

interface ConfirmState {
  isVisible: boolean;
  func?: () => any;
  props?: ConfirmationProps;
}

const ConfirmationDialogProvider = ({
  children
}: React.PropsWithChildren<{}>) => {
  const [confirmState, setConfirmState] = useState<ConfirmState>({
    isVisible: false
  });

  const withConfirmation = (func: () => any, props: ConfirmationProps) => () =>
    setConfirmState({
      isVisible: true,
      func,
      props
    });

  const handleConfirmClose = (confirmed: boolean) => {
    if (confirmed) {
      confirmState.func?.();
    }
    setConfirmState((prev) => ({
      ...prev,
      isVisible: false
    }));
  };

  return (
    <ConfirmationDialogContext.Provider value={{ withConfirmation }}>
      <ConfirmationDialog
        onClose={handleConfirmClose}
        visible={confirmState.isVisible}
        {...confirmState.props}
      />
      {children}
    </ConfirmationDialogContext.Provider>
  );
};

export default ConfirmationDialogProvider;
