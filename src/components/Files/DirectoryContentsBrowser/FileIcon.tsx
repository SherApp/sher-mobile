import { Feather } from '@expo/vector-icons';
import React from 'react';
import useTheme from '../../../theme/useTheme';
import { FileKind, getFileKindFromContentType } from '@sherapp/sher-shared';

interface Props {
  contentType: string;
}

type FileKindIconMap = {
  [kind in FileKind]: React.ComponentProps<typeof Feather>['name'];
};

const icons: FileKindIconMap = {
  [FileKind.Image]: 'image',
  [FileKind.Document]: 'file-text',
  [FileKind.Audio]: 'music',
  [FileKind.Video]: 'film',
  [FileKind.Unknown]: 'file'
};

const FileIcon = ({ contentType }: Props) => {
  const kind = getFileKindFromContentType(contentType);
  const icon = icons[kind];

  const { colors } = useTheme();

  return <Feather name={icon} size={24} color={colors['primary']} />;
};

export default FileIcon;
