import { Box, Container, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import Helmet from 'react-helmet';

import { APP_NAME } from 'src/app/constants';

export default function ServerSettingPage() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Server settings | ${APP_NAME}`}</title>
      </Helmet>

      <Container>
        {/* <Stack direction="row"> */}
          <Box maxWidth={250}>
            <Stack direction="column" backgroundColor={'red'}>
              <Typography component="h1" variant='h5'>Server name</Typography>
              <Typography>Overview</Typography>
              <Typography>Invites</Typography>
              <Typography>Members</Typography>
              <Typography>Delete</Typography>
            </Stack>
          </Box>
        {/* </Stack> */}
      </Container>
    </React.Fragment>
  );
}
