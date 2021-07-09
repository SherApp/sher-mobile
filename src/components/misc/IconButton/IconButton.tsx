import React from 'react';
import Ripple, { RippleProps } from 'react-native-material-ripple';

const IconButton = ({
  children,
  ...rest
}: React.PropsWithChildren<RippleProps>) => {
  return (
    <Ripple
      style={{
        aspectRatio: 1,
        width: 36,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
      {...rest}
    >
      {children}
    </Ripple>
  );
};

export default IconButton;
