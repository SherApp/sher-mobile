import { Feather } from '@expo/vector-icons';
import React from 'react';
import { FileKind, getFileKindFromContentType } from '@sherapp/sher-shared';
import Icon from '../../misc/Icon';

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

  return <Icon name={icon} color={'primary'} />;
};

export default FileIcon;
