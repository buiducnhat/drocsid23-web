import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Container,
  IconButton,
  DialogActions,
  Button,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import React, { useEffect } from 'react';
import serverAPI from 'src/features/server/serverAPI';
import LoadingModal from 'src/commons/components/LoadingModal';

const CreateInvitationDialog = NiceModal.create(({ serverId }) => {
  const modal = useModal();

  const [server, serServer] = React.useState(null);
  const [expireTime, setExpireTime] = React.useState(7);
  const [code, setCode] = React.useState('');

  const handleSubmit = () => {
    NiceModal.show(LoadingModal);

    serverAPI
      .createInviteLink(serverId, { expireTime })
      .then((res) => {
        setCode(res.data.data.inviteCode);
        NiceModal.hide(LoadingModal);
      })
      .catch(() => {
        NiceModal.hide(LoadingModal);
      });
  };

  useEffect(() => {
    NiceModal.show(LoadingModal);

    serverAPI.getServerInfo(serverId).then((res) => {
      serServer(res.data.data);
      NiceModal.hide(LoadingModal);
    });
  }, []);

  return (
    <Dialog {...muiDialogV5(modal)}>
      {server && (
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
          <DialogTitle>Create invitation code</DialogTitle>

          <DialogContent>
            <TextField
              fullWidth
              label="Expiration time (days)"
              type="number"
              margin="dense"
              value={expireTime}
              onChange={(e) => setExpireTime(e.target.value)}
            />

            {code && (
              <Stack
                sx={{ mt: 2 }}
                spacing={1}
                direction="row"
                width="100%"
                alignItems="center"
              >
                <Typography variant="body">Invitation code:</Typography>

                <Typography variant="h6" color="green">
                  {code}
                </Typography>
              </Stack>
            )}
          </DialogContent>

          <DialogActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={() => modal.hide()}>
              Cancel
            </Button>

            <Button variant="outlined" onClick={handleSubmit}>
              OK
            </Button>
          </DialogActions>
        </Container>
      )}
    </Dialog>
  );
});

export default CreateInvitationDialog;
