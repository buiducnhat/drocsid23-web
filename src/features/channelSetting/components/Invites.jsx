import React from 'react';
import { Stack, Typography, colors, Divider, Grid, Link } from '@mui/material';

function Invites() {
  return (
    <Stack py={2} color={colors.grey[400]}>
      <Stack width="100%" color={colors.grey[100]} pb={3}>
        <Typography variant="h6">Invites</Typography>
      </Stack>
      <Stack direction="row">
        <Typography fontSize={13} mr={0.5}>
          Here's a list of all active invite links. You can revoke any one or
        </Typography>
        <Link fontSize={13}>create one</Link>
      </Stack>
      <Divider
        sx={{
          backgroundColor: colors.grey[700],
          marginTop: 3,
          marginBottom: 2,
        }}
      ></Divider>

      <Stack className="table" color={colors.grey[300]} pb={2} direction="row">
        <Grid item xs={3}>
          INVITER
        </Grid>
        <Grid item xs={5}>
          INVITE CODE
        </Grid>
        <Grid item xs={2}>
          USES
        </Grid>
        <Grid item xs={3}>
          EXPIRES
        </Grid>
      </Stack>
      <Stack className="table-content" direction="row">
        <Grid item xs={3}>
          Titi
        </Grid>
        <Grid item xs={5}>
          SHDfeasfcsad
        </Grid>
        <Grid item xs={2}>
          0
        </Grid>
        <Grid item xs={3}>
          06:17:33:54
        </Grid>
      </Stack>
      <Divider
        sx={{
          backgroundColor: colors.grey[700],
          marginTop: 3,
          marginBottom: 2,
        }}
      ></Divider>
    </Stack>
  );
}

export default Invites;
