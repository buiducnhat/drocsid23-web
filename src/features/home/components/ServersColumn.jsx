import React from 'react';
import { Stack, useTheme } from '@mui/material';

import ChatAvatar from './ChatAvatar';
import AddServerOnColumn from './AddServerOnColumn';

function ServersColumn({ servers, selectedServerId, setSelectedServerId }) {
  const theme = useTheme();

  return (
    <Stack
      direction="column"
      height="100%"
      py={1}
      spacing={2}
      backgroundColor={theme.palette.background.paper}
    >
      <ChatAvatar isDirect={true} name="Direct Messages" />

      {servers.map((server) => (
        <ChatAvatar
          key={server.id}
          name={server.name}
          imgUrl={server?.avatar}
          isSelected={server.id === selectedServerId}
          onClick={() => setSelectedServerId(server.id)}
        />
      ))}

      <AddServerOnColumn />
    </Stack>
  );
}

export default ServersColumn;
