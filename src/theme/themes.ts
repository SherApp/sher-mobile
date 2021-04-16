import { AppTheme } from './types';

const darkTheme: AppTheme = {
  dark: true,
  colors: {
    primary: '#EC38BC',
    text: '#F3F4F6',
    textSecondary: '#9CA3AF',
    button: 'white',
    background: '#000000',
    border: '#1F2937',
    card: '#111827',
    notification: '#1F2937',
    error: '#EF4444'
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
    notification: 'white',
    error: '#EF4444'
  },
  gradients: {
    primary: ['#8A0CE1', '#EC38BC']
  },
  spacing: (v) => v * 8
};

export { defaultTheme, darkTheme };
