import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, styled, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSelector, useDispatch } from 'react-redux';

import { APP_NAME } from 'src/app/constants';
import { selectThemeMode, toggleThemeMode } from 'src/features/theme/themeSlice';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const HomePage = () => {
  const dispatch = useDispatch();

  const themeMode = useSelector(selectThemeMode);

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Home | ${APP_NAME}`}</title>
      </Helmet>

      <Box p={2} sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid xs={0.5}>
            <Item>xs=0.5</Item>
          </Grid>
          <Grid xs={1.5}>
            <Item>xs=1.5</Item>
          </Grid>
          <Grid xs={10}>
            <Item>xs=10</Item>
          </Grid>

        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default HomePage;
