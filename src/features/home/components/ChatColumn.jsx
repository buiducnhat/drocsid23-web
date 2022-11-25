import React from 'react';
import { Box, useTheme } from '@mui/material';

function ChatColumn() {
  const theme = useTheme();

  return (
    <Box
      height="100%"
      width="100%"
      backgroundColor={theme.palette.grey[850]}
    ></Box>
  );
}

export default ChatColumn;
