import { createTheme } from '@mui/material';
import {
  BrandColors,
  BrandColorOptions,
  GrayColors,
  GrayColorOptions,
  IconColors,
  IconColorOptions,
} from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface BrandColors {
    primary: string;
    white: string;
    error: string;
  }

  interface BrandColorOptions {
    primary?: string;
    white?: string;
    error?: string;
  }

  interface GrayColors {
    text: string;
    background: string;
  }

  interface GrayColorOptions {
    text?: string;
    background?: string;
  }

  interface IconColors {
    blue: string;
  }

  interface IconColorOptions {
    blue?: string;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    brand: BrandColors;
    gray: GrayColors;
    icon: IconColors;
  }

  interface PaletteOptions {
    brand: BrandColorOptions;
    gray: GrayColorOptions;
    icon: IconColorOptions;
  }
}

export default createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // NOTE: ボタンテキストのアルファベットが自動で大文字になる設定をOFF
          textTransform: 'none',
        },
      },
    },
  },
  palette: {
    brand: {
      primary: '#1565C0',
      white: '#FFFFFF',
      error: '#D32F2F',
    },
    gray: {
      text: '#262626',
      background: '#fafafa',
    },
    icon: {
      blue: '#1565C0',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1025,
      xl: 1536,
    },
  },
});
