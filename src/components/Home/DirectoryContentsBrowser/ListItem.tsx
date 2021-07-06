import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Surface from '../../misc/Surface/Surface';
import Typography from '../../misc/Typography';
import React from 'react';
import useTheme from '../../../theme/useTheme';

interface Props {
  icon?: React.ReactNode;
  name: string;
  secondary?: string;
  onPress?(): void;
  menu: React.ReactNode;
}

const ListItem = ({ icon, name, secondary, onPress, menu }: Props) => {
  const { spacing } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Surface m={[1, 0]} style={styles.container}>
        <View style={styles.iconContainer}>{icon}</View>
        <View style={{ marginLeft: spacing(2), flex: 1 }}>
          <Typography>{name}</Typography>
          {secondary && (
            <Typography color="textSecondary">{secondary}</Typography>
          )}
        </View>
        {menu}
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    justifyContent: 'center',
    aspectRatio: 1,
    height: 32
  }
});

export default ListItem;
