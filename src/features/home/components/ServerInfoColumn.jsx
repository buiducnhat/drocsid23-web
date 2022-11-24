import { Box, colors, Divider, Stack, Typography } from '@mui/material';
import React from 'react';

function ServerInfoColumn() {
  return (
    <Stack height="100%" width="250px" p={1} backgroundColor={colors.grey[900]}>
      <Typography variant="h6" component="h1">
        Name Server
      </Typography>

      <Divider sx={{ marginY: 1 }} />
    </Stack>
  );
}

export default ServerInfoColumn;
