import { AppTheme } from './types';

const darkTheme: AppTheme = {
  dark: true,
  colors: {
    primary: '#EC38BC',
    text: 'rgba(255, 255, 255, 0.8)',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    button: 'white',
    background: '#000000',
    border: '#1F2937',
    card: '#000000', // TODO: Change this
    notification: '#1F2937'
  },
  gradients: {
    primary: ['#8A0CE1', '#EC38BC']
  },
  spacing: (v) => v * 8
};

const defaultTheme: AppTheme = {
  dark: false,
  colors: {
    primary: '#EC38BC',
    text: '#374151',
    textSecondary: 'rgba(0, 0, 0, 0.26)',
    button: 'white',
    background: 'white',
    border: '#e5e7eb',
    card: 'white',
    notification: 'white'
  },
  gradients: {
    primary: ['#8A0CE1', '#EC38BC']
  },
  spacing: (v) => v * 8
};

export { defaultTheme, darkTheme };
