import React from 'react';
import { Helmet } from 'react-helmet';
import { Stack, Box } from '@mui/material';

import { APP_NAME } from 'src/app/constants';
import MessageColumn from './components/MessagesColumn';
import ServerInfoColumn from './components/ServerInfoColumn';
import ChatColumn from './components/ChatColumn';

const HomePage = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>{`Home | ${APP_NAME}`}</title>
      </Helmet>

      <Stack height="100vh" direction="row">
        <Box height="100%" maxWidth={80}>
          <MessageColumn />
        </Box>

        <Box height="100%" maxWidth={250}>
          <ServerInfoColumn />
        </Box>

        <Box height="100%" width="100%">
          <ChatColumn />
        </Box>
      </Stack>
    </React.Fragment>
  );
};

export default HomePage;
