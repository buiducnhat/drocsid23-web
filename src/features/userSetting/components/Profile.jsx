import React from 'react';
import {
  Typography,
  Stack,
  colors,
  Box,
  Divider,
  Button,
  Avatar,
} from '@mui/material';
import useCheckAuth from 'src/hooks/useCheckAuth';
import { useSelector } from 'react-redux';
import { selectListJoinedServer } from 'src/features/server/serverSlice';

function Profiles() {
  const { userData: user } = useCheckAuth();
  const servers = useSelector(selectListJoinedServer);
  const [avatar, setAvatar] = React.useState(user.avatar);

  return (
    <Stack color={colors.grey[400]}>
      <Stack width="100%" py={2} color={colors.grey[100]}>
        <Typography variant="h6">Profiles</Typography>
      </Stack>
      <Typography color={colors.grey[200]} mb={2}>
        User Profile
      </Typography>
      <Divider color={colors.grey[700]} />
      <Stack direction="row">
        <Box p={1} sx={{ width: 400 }}>
          <Typography sx={{ fontSize: '0.8rem' }}>AVATAR</Typography>
          <Button sx={{ marginRight: 2 }} variant="contained" component="label">
            Change Avatar
            <input
              hidden
              onClick={(e) => setAvatar(e.target.value)}
              accept="image/*"
              multiple
              type="file"
            />
          </Button>
          <Button
            onClick={() => setAvatar('')}
            sx={{ color: colors.grey[200] }}
          >
            Remove Avatar
          </Button>
          <Box p={2}>
            <Divider color={colors.grey[700]} />
          </Box>
        </Box>
        <Box p={1} width={300}>
          <Typography sx={{ fontSize: '1rem' }}>Preview</Typography>

          <Stack p={1}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                }}
                alt="Remy Sharp"
                src={avatar}
              />
              <Typography sx={{ color: colors.grey[200], fontSize: '1.5rem' }}>
                {user.first_name} {user.last_name}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>

      <Typography color={colors.grey[200]} mb={2}>
        Server Profiles
      </Typography>
      <Divider color={colors.grey[700]} />
      <Stack py={2}>
        {servers.map((server) => (
          <Stack
            key={server.id}
            m={0.5}
            height={60}
            width={500}
            alignItems="center"
            backgroundColor={colors.grey[900]}
            direction="row"
            borderRadius={2}
          >
            <Avatar
              sx={{
                width: 45,
                height: 45,
                marginLeft: 2,
              }}
              src={server.avatar}
            />
            <Typography px={2}>{server.name}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default Profiles;
