import React from 'react';
import {
  Box,
  Button,
  Stack,
  colors,
  Divider,
  Card,
  Modal,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { DialogEditName, DialogEditUsername } from './Dialog';

function MyAccount({ user }) {
  const [openUsername, setOpenUsername] = React.useState(false);
  const [openName, setOpenName] = React.useState(false);
  const [openEmail, setOpenEmail] = React.useState(false);
  return (
    <Stack>
      <Stack width="100%" py={2} color={colors.grey[100]}>
        <Typography variant="h5">My Account</Typography>
      </Stack>
      <Card
        sx={{
          width: 700,
          height: 350,
          borderRadius: 2,
          backgroundColor: colors.grey[900],
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          color={colors.grey[200]}
          fontSize="1.5rem"
          p={4}
          alignItems="center"
        >
          <Stack direction="row" alignItems="center">
            <Avatar
              sx={{
                width: 80,
                height: 80,
                marginRight: 2,
              }}
              alt="Remy Sharp"
              src={user.avatar}
            />
            {user.first_name} {user.last_name}
          </Stack>
          <Button sx={{ height: 40 }} variant="contained">
            Edit User Profile
          </Button>
        </Stack>
        <Box
          color={colors.grey[100]}
          m="auto"
          backgroundColor={colors.grey[800]}
          sx={{
            width: 650,
            height: 180,
            borderRadius: 2,
            fontSize: '1.2rem',
          }}
        >
          <Stack py={1.5} px={2} justifyContent="space-between" direction="row">
            Username: {user.username}
            <Button onClick={() => setOpenUsername(true)} variant="contained" color="grey">
              Edit
            </Button>
          </Stack>

          <Modal
            open={openUsername}
            onClose={() => setOpenUsername(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DialogEditUsername user={user} />
          </Modal>

          <Stack py={1.5} px={2} justifyContent="space-between" direction="row">
            Name: {user.first_name} {user.last_name}
            <Button onClick={() => setOpenName(true)} variant="contained">Edit</Button>
          </Stack>
          <Modal
            open={openName}
            onClose={() => setOpenName(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DialogEditName user={user} />
          </Modal>
          <Stack py={1.5} px={2} justifyContent="space-between" direction="row">
            Email: {user.email}
            <Button onClick={() => setOpenEmail(true)} variant="contained">Edit</Button>
          </Stack>
          <Modal
            open={openEmail}
            onClose={() => setOpenEmail(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DialogEditUsername user={user} />
          </Modal>
        </Box>
      </Card>
      <Box py={2}>
        <Divider width={750} color={colors.grey[500]} />
      </Box>
      <Box color={colors.grey[100]}>
        <Typography py={1} variant="h5">
          Password and Authentication
        </Typography>
        <Button variant="contained">Change Password</Button>
      </Box>
    </Stack>
  );
}

export default MyAccount;
