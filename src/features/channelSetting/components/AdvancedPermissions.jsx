import React from 'react';
import { Stack, colors, Typography, Box, Divider } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Radio from '@mui/material/Radio';

function AdvancedPermissions() {
  const [selectedValue, setSelectedValue] = React.useState('b');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const permissions = [
    {
      title: 'Manage Channel',
      description:
        "Allows members to change this channel 's name. They can also delete the channel.",
    },
    {
      title: 'Create Invite',
      description:
        'Allows members to invite new people to this server via a direct invite link to this channel. The recipient will automatically join the voice channel if they have permission to connect.',
    },
    {
      title: 'Send Messages',
      description: 'Allows members to send messages in this channel.',
    },
    {
      title: 'Manage Messages',
      description:
        'Allows members to delete messages by other members or pin any message in this channel.',
    },
    // permissions voice channel
    {
      title: 'Connect',
      description:
        'Allows members to join this channel and hear others. Disabing this and the "View Channel" permissions for @everyone will make this channel private.',
    },
    {
      title: 'Speak',
      description:
        "Allows members to talk in this voice channel. If this permission is disabled, members are default muted until somebody with the 'Mute Members' permissions unmutes them",
    },
    {
      title: 'Video',
      description:
        'Allows members to share their video, Screen Share or stream a game in this voice channel',
    },
    {
      title: 'Mute Members',
      description:
        'Allows members to mute other members in this voice channel for everyone.',
    },
    {
      title: 'Deafen Members',
      description:
        "Allows members to deafen other members in this voice channel, which means they won't be able to speak or hear others.",
    },
  ];
  return (
    <>
      <Stack width="100%" color={colors.grey[100]}>
        <Typography variant="h6">AdVanced Permissions</Typography>
      </Stack>
      <Stack pt={3} flexDirection="row">
        <Box className="addRole" width={300} mr={3}>
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
          <Typography mb={2} fontSize={16}>
            General Channel Permissions
          </Typography>

          {permissions.map((permission) => (
            <>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                pr={2}
              >
                <Typography color={colors.grey[200]} variant="subtitle1">
                  {permission.title}
                </Typography>
                <div>
                  <Radio
                    {...controlProps('a')}
                    sx={{
                      color: colors.red[800],
                      '&.Mui-checked': {
                        color: colors.red[800],
                      },
                    }}
                  />
                  <Radio
                    {...controlProps('b')}
                    sx={{
                      color: colors.grey[200],
                      '&.Mui-checked': {
                        color: colors.grey[200],
                      },
                    }}
                  />
                  <Radio
                    {...controlProps('v')}
                    sx={{
                      color: colors.green[500],
                      '&.Mui-checked': {
                        color: colors.green[500],
                      },
                    }}
                  />
                </div>
              </Stack>
              <Typography fontSize={13}>{permission.description}</Typography>
              <Stack my={2}>
                <Divider color={colors.grey[700]} />
              </Stack>
            </>
          ))}
        </Box>
      </Stack>
    </>
  );
}

export default AdvancedPermissions;
