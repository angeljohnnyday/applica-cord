"use client"

import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: ['Nunito', 'sans-serif'].join(','),
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
        variant: 'outlined',
        fullWidth: true,
      }
    }
  }
});

export default theme;
