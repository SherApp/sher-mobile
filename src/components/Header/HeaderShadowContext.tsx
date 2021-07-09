import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

interface HeaderShadowContextType {
  setShadowVisible?(visible: boolean): void;
  shadow?: Animated.Value;
  shadowVisible?: boolean;
}

const Context = React.createContext<HeaderShadowContextType>({});

export const useHeaderShadow = () => useContext(Context);

export const HeaderShadowProvider = ({
  children
}: React.PropsWithChildren<{}>) => {
  const [shadowVisible, setShadowVisible] = useState(false);
  const shadowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const to = shadowVisible ? 3 : 0;
    Animated.timing(shadowAnim, {
      toValue: to,
      duration: 100,
      useNativeDriver: true
    }).start();
  }, [shadowVisible]);

  return (
    <Context.Provider
      value={{ setShadowVisible, shadow: shadowAnim, shadowVisible }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
