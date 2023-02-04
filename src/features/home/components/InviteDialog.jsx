import * as React from 'react';
import {
  DialogTitle,
  DialogContent,
  IconButton,
  Dialog,
  Container,
  Stack,
  Button,
  Avatar,
  Typography,
  colors,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

const listFriend = [
  {
    id: 2,
    username: 'NamNV',
    avatar:
      'https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg',
  },
  {
    id: 3,
    username: 'trungAA',
    avatar:
      'https://i.pinimg.com/originals/49/3f/a0/493fa0f13970ab3ef29375669f670451.jpg',
  },
  {
    id: 4,
    username: 'HangAS',
    avatar:
      'https://www.creativefabrica.com/wp-content/uploads/2021/04/11/Woman-Avatar-Icon-Vector-Graphics-10677522-1-580x387.jpg',
  },
  {
    id: 5,
    username: 'NghiaTV',
    avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png',
  },
  {
    id: 6,
    username: 'NamNV',
    avatar:
      'https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg',
  },
  {
    id: 7,
    username: 'trungAA',
    avatar:
      'https://i.pinimg.com/originals/49/3f/a0/493fa0f13970ab3ef29375669f670451.jpg',
  },
];

const InviteDialog = NiceModal.create(() => {
  const modal = useModal();
  const handleCreateServer = () => {
    modal.hide();
  };
  const linkInvite = 'https://discord.gg/wH7xHsuE';

  return (
    <Dialog open={modal.visible} onClose={() => modal.hide()}>
      <Container sx={{ position: 'relative', width: 500 }}>
        <IconButton
          aria-label="close"
          sx={{
            position: 'absolute',
            top: 8,
            right: 16,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={() => modal.hide()}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>Invite Friends </DialogTitle>
        <DialogContent>
          <Stack style={{ maxHeight: 250, overflow: 'auto' }}>
            {listFriend.map((fr) => (
              <Stack
                key={fr.id}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                px={1}
                py={0.5}
                sx={{ '&:hover': { backgroundColor: colors.grey[800] } }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar src={fr.avatar} />
                  <Typography fontWeight={500} fontSize={18}>
                    {fr.username}
                  </Typography>
                </Stack>
                <Button variant="outlined">Invite</Button>
              </Stack>
            ))}
          </Stack>
          <Stack pt={2}>
            <Typography fontWeight={600}>
              Or send a server invite link to a friend
            </Typography>
            <Stack bgcolor={colors.grey[900]} p={1}>
              <Typography fontSize={16}>{linkInvite}</Typography>
            </Stack>
          </Stack>
        </DialogContent>
      </Container>
    </Dialog>
  );
});

export default InviteDialog;
