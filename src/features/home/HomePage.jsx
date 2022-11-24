import React from 'react';
import { Helmet } from 'react-helmet';

import { APP_NAME } from 'src/app/constants';
import ChatColumn from './components/ChatColumn';
import { Stack, Box } from '@mui/material';

const HomePage = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>{`Home | ${APP_NAME}`}</title>
      </Helmet>

      <Stack height="100vh">
        <Box height="100%" maxWidth={72}>
          <ChatColumn />
        </Box>
      </Stack>
    </React.Fragment>
  );
};

export default HomePage;
