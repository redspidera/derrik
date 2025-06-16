import { createTheme, lighten } from '@mui/material/styles';

// Your primary colors
const primaryMain = '#093083';
const primaryLight = lighten(primaryMain, 0.15); // Lightened version for background

const theme = createTheme({
  palette: {
    background: {
      paper: '#fff', // your main primary color (dark blue)
      
    },
    text:{
      primary:primaryMain,
    },
    primary: {
      main: primaryMain, // your main primary color (dark blue)
      light: primaryLight, // a lighter blue variant
      dark: 'var(--p-color)', // a darker shade for hover/focus
      contrastText: '#fff', // text color on primary backgrounds
    },
    action: {
      hover: primaryLight + ' !important', // light gray on hover
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f5f5', // or use a theme color
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          padding: '12px 16px',
          minHeight: '48px',
          '&.Mui-expanded': {
            minHeight: '48px',
          },
        },
        content: {
          margin: 0,
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
  },
  typography: {
  fontFamily: `var(--font-1), 'Helvetica', 'Arial', sans-serif`,
  body1: {
    fontSize: '1rem', // 16px
  },
  body2: {
    fontSize: '0.9rem', // 16px
  },
  h1: {
    fontSize: '3rem', // 32px
  },
  h2: {
    fontSize: '2.75rem', // 28px
  },
  h3: {
    fontSize: '2.2rem', // 24px
  },
  h4: {
    fontSize: '1.85rem', // 20px
  },
  h5: {
    fontSize: '1.6rem', // 16px
  },
  h6: {
    fontSize: '1.3rem', // 14px
  },
},

});

export default theme;
