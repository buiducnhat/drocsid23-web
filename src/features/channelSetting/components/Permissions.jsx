import React from 'react';
import { Stack, Typography, colors, Divider, Switch } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import LockIcon from '@mui/icons-material/Lock';
import AdvancedPermissions from './AdvancedPermissions';
import PrivateChannel from 'src/features/channelSetting/components/PrivateChannel';

function Permissions() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <Stack py={2} color={colors.grey[400]}>
      <Stack width="100%" color={colors.grey[100]}>
        <Typography variant="h6">Channel Permissions</Typography>
      </Stack>
      <Stack pt={3}>
        <Typography fontSize={13}>
          Use permissions to customise who can do what in this channel
        </Typography>
        <Stack
          mt={2}
          flexDirection="row"
          alignItems="center"
          p={2}
          bgcolor={colors.grey[900]}
          borderRadius={2}
        >
          <CachedIcon></CachedIcon>
          <Typography ml={2}>
            Permission synced with category: Text Channel{' '}
          </Typography>
        </Stack>
        <Stack mt={2} p={2} bgcolor={colors.grey[900]} borderRadius={2}>
          <Stack flexDirection="row" justifyContent="space-between">
            <Stack flexDirection="row">
              <LockIcon></LockIcon>
              <Typography ml={2}>Private Channel</Typography>
            </Stack>
            <Switch checked={checked} onChange={handleChange} />
          </Stack>
          <Typography fontSize={13} mt={1}>
            Use permissions to customise who can do what in this channel
          </Typography>
        </Stack>
        {checked ? <PrivateChannel /> : ''}
      </Stack>
      <Stack my={4}>
        <Divider color={colors.grey[600]} />
      </Stack>
      <AdvancedPermissions />
    </Stack>
  );
}

export default Permissions;
