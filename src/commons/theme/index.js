import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  color: {
    primary: '#D32F2F',
    secondary: '#009688',
    error: '#E64A19',
    textColor: '#FFFF',
    textColorDefault: '#000000',
    hover: 'rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: 'Roboto',
  },
  shape: {
    borderRadius: 4,
    backgroundColor: '#E040FB',
    textColor: '#FFFF',
    border: '#CCCCC',
  },
});

export default theme;
