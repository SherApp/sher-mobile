import { Theme } from '@react-navigation/native';

interface AppTheme extends Theme {
  gradients: { primary: [string, string] };
  spacing: (value: number) => number;
  colors: Theme['colors'] & {
    button: string;
    textSecondary: string;
    error: string;
  };
}

export { AppTheme };
