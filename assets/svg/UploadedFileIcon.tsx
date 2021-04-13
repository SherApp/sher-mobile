import React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

const UploadedFileIcon = () => {
  return (
    <Svg viewBox="0 0 16 16">
      <Path
        fill="url(#a)"
        d="M 3.7539062,0.50000018 C 2.7869062,0.50000018 2,1.2869064 2,2.2539064 L 2,13.246094 C 2,14.213094 2.7869062,15 3.7539062,15 l 7.9921878,0 C 12.713094,15 13.5,14.213094 13.5,13.246094 l 0,-8.4746094 c 0,-0.007 -0.0068,-0.012531 -0.0078,-0.019531 -0.005,-0.059 -0.02145,-0.1152031 -0.06445,-0.1582031 L 9.4277344,0.59375018 c -0.042,-0.042 -0.096344,-0.0604063 -0.1523438,-0.0664063 -0.023,-0.007 -0.043359,-0.0273438 -0.068359,-0.0273438 l -5.453125,0 z m 0,0.50000002 5.2460938,0 0,2.28125 c 0,0.959 0.780281,1.7402344 1.738281,1.7402344 l 2.261719,0 0,8.2246094 C 13,13.937094 12.436094,14.5 11.746094,14.5 l -7.9921878,0 C 3.0639063,14.5 2.5,13.937094 2.5,13.246094 l 0,-10.9921876 c 0,-0.691 0.5639063,-1.2539062 1.2539062,-1.2539062 z M 9.5019531,1.3945314 C 10.273433,2.1610096 11.815002,3.694 12.646484,4.5214846 l -1.908203,0 c -0.683,0 -1.2363279,-0.5572344 -1.2363279,-1.2402344 l 0,-1.8867188 z m 0.6816409,8.2949219 c -0.067,0 -0.132688,0.029125 -0.179688,0.078125 l -1.4746091,1.5624997 0.3632812,0.34375 1.0449219,-1.105469 0,2.69336 0.5,0 0,-2.703125 1.085938,1.117187 0.359374,-0.349609 -1.517578,-1.5605468 c -0.048,-0.049 -0.09764,-0.069172 -0.18164,-0.076172 z"
      />
      <Defs>
        <LinearGradient id="a" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#000092" />
          <Stop offset="1" stopColor="#FF00F3" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default UploadedFileIcon;
