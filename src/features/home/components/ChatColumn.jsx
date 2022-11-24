import React from 'react';
import { Stack, colors } from '@mui/material';

import ChatAvatar from './ChatAvatar';
import AddServerOnColumn from './AddServerOnColumn';

function ChatColumn() {
  return (
    <Stack
      direction="column"
      height="100%"
      py={1}
      pr={2}
      spacing={2}
      backgroundColor={colors.grey[900]}
    >
      <ChatAvatar isDirect={true} name="Direct Messages" />

      <ChatAvatar name="group 23 server" />

      <ChatAvatar
        name="bui ducnhat"
        imgUrl="https://material-ui.com/static/images/avatar/1.jpg"
        isSelected={true}
      />

      <ChatAvatar
        name="bui ducnhat22"
        imgUrl="https://material-ui.com/static/images/avatar/2.jpg"
      />

      <AddServerOnColumn />
    </Stack>
  );
}

export default ChatColumn;
