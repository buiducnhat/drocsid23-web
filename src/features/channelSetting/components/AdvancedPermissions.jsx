import React from 'react';
import { Stack, colors, Typography, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function AdvancedPermissions() {
  return (
    <>
      <Stack width="100%" color={colors.grey[100]}>
        <Typography variant="h6">AdVanced Permissions</Typography>
      </Stack>
      <Stack pt={3} flexDirection="row">
        <Box className="addRole" width={200} mr={2}>
          <Stack flexDirection="row" justifyContent="space-between" py={0.3}>
            <Typography fontSize={14}>Roles/Members</Typography>
            <AddCircleOutlineIcon fontSize="small"></AddCircleOutlineIcon>
          </Stack>
          <Stack
            height={32}
            bgcolor={colors.grey[700]}
            borderRadius={1.5}
            pl={1.5}
            flexDirection="row"
            alignItems="center"
            color={colors.grey[200]}
          >
            @everyone
          </Stack>
        </Box>
        <Box className="channelPermission">   
            <Typography fontSize={14}>General Channel Permissions</Typography>
            <Stack>

            </Stack>
        </Box>
      </Stack>
    </>
  );
}

export default AdvancedPermissions;
