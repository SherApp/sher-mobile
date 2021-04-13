import React, { useRef } from 'react';
import { TextInput } from 'react-native';

interface Props {
  children: JSX.Element[];
}

const TextFieldGroup = ({ children }: Props) => {
  const refs: React.RefObject<TextInput>[] = [];
  for (let i = 0; i < children.length; i++) {
    refs.push(useRef<TextInput>(null));
  }

  const handleSubmitEditing = (inputIndex: number) => {
    if (inputIndex === children.length - 1) return;

    refs[++inputIndex].current?.focus();
  };

  return (
    <>
      {children.map((element, i) => {
        const isLastComponent = i == children.length - 1;
        return React.cloneElement(element, {
          ...element.props,
          ...(!isLastComponent ? { returnKeyType: 'next' } : {}),
          onSubmitEditing: () => handleSubmitEditing(i),
          blurOnSubmit: isLastComponent,
          ref: refs[i],
          key: i
        });
      })}
    </>
  );
};

export default TextFieldGroup;
