import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import * as colors from '@mui/material/colors';
import { useSelector } from 'react-redux';

import routes from './app/routes';
import { selectThemeMode } from './features/theme/themeSlice';

const App = () => {
  const themeMode = useSelector(selectThemeMode);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary: {
            main: colors.indigo[500],
            light: colors.indigo[700],
            dark: colors.indigo[300],
          },
          secondary: colors.lime,
        },
      }),
    [themeMode]
  );
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
};

export default App;
