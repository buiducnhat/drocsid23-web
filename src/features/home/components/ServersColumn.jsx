import React from 'react';
import { Stack, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

import ChatAvatar from './ChatAvatar';
import AddServerOnColumn from './AddServerOnColumn';
import { selectListJoinedServer } from 'src/features/server/serverSlice';

function ServersColumn() {
  const theme = useTheme();

  const listJoinedServer = useSelector(selectListJoinedServer);

  return (
    <Stack
      direction="column"
      height="100%"
      py={1}
      spacing={2}
      backgroundColor={theme.palette.background.paper}
    >
      <ChatAvatar isDirect={true} name="Direct Messages" />

      {listJoinedServer.map((server) => (
        <ChatAvatar
          key={server._id}
          serverId={server._id}
          name={server.name}
          imgUrl={`https://ui-avatars.com/api/?name=${server.name
            .split(' ')
            .join()}&background=random`}
        />
      ))}

      <AddServerOnColumn />
    </Stack>
  );
}

export default ServersColumn;
