import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Button, Typography, Switch } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { APP_NAME } from 'src/app/constants';
import { selectThemeMode, toggleThemeMode } from 'src/features/theme/themeSlice';

const HomePage = () => {
  const dispatch = useDispatch();

  const themeMode = useSelector(selectThemeMode);

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Home | ${APP_NAME}`}</title>
      </Helmet>

      <Container>
        <Typography variant="h1" component="h1" gutterBottom>
          Home
        </Typography>

        <Button>Theme</Button>
        <Switch checked={themeMode === 'dark'} onChange={(e) => dispatch(toggleThemeMode())} />
      </Container>
    </React.Fragment>
  );
};

export default HomePage;
