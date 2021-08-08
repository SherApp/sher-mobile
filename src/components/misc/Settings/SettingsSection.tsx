import Surface from '../Surface';
import React from 'react';
import Typography from '../Typography';
import useTheme from '../../../theme/useTheme';

interface Props {
  header: string;
}

const SettingsSection = ({
  header,
  children
}: React.PropsWithChildren<Props>) => {
  const { spacing } = useTheme();

  return (
    <Surface>
      <Typography style={{ marginLeft: spacing(2) }} color="primary">
        {header}
      </Typography>
      {children}
    </Surface>
  );
};

export default SettingsSection;
