import React from 'react';
import { Helmet } from 'react-helmet';
import { Stack, Box } from '@mui/material';

import { APP_NAME } from 'src/app/constants';
import ServersColumn from './components/ServersColumn';
import ServerInfoColumn from './components/ServerInfoColumn';
import ChatColumn from './components/ChatColumn';

const channels = [
  {
    id: 1,
    name: 'General',
    type: 'text',
  },
  {
    id: 2,
    name: 'Learning',
    type: 'text',
  },
  {
    id: 3,
    name: 'Voice main',
    type: 'voice',
  },
  {
    id: 4,
    name: 'Gaming',
    type: 'voice',
  },
];
const servers = [1, 2, 3, 4, 5].map((id) => ({
  id,
  name: 'Server ' + id,
  channels,
  avatar:
    Math.random() < 0.5
      ? 'https://material-ui.com/static/images/avatar/1.jpg'
      : '',
}));

const HomePage = () => {
  const [selectedServerId, setSelectedServerId] = React.useState(servers[0]);

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Home | ${APP_NAME}`}</title>
      </Helmet>

      <Stack height="100vh" direction="row">
        <Box height="100%" maxWidth={80}>
          <ServersColumn
            servers={servers}
            selectedServerId={selectedServerId}
            setSelectedServerId={setSelectedServerId}
          />
        </Box>

        <Box height="100%" maxWidth={250}>
          <ServerInfoColumn channels={channels} />
        </Box>

        <Box height="100%" width="100%">
          <ChatColumn channel={channels[0]} />
        </Box>
      </Stack>
    </React.Fragment>
  );
};

export default HomePage;
