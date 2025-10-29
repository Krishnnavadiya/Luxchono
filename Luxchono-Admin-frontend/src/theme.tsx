import { createTheme } from '@mui/material';
// Create a custom theme
export const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: 'Open Sans, sans-serif',
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#964315",
    },
  },
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),

  },
});
