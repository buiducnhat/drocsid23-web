import * as React from 'react';
import {
  DialogTitle,
  DialogContent,
  IconButton,
  Dialog,
  Container,
  TextField,
  Stack,
  Button,
  Divider,
  Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import { useDispatch } from 'react-redux';
import {
  createServerAction,
  getListJoinedServerAction,
} from 'src/features/server/serverSlice';
import serverAPI from 'src/features/server/serverAPI';
import LoadingModal from 'src/commons/components/LoadingModal';
import {toast} from 'react-toastify';

const AddServerDialog = NiceModal.create(() => {
  const modal = useModal();
  const dispatch = useDispatch();
  const [nameServer, setNameServer] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [serverCode, setServerCode] = React.useState(null);

  const handleNameServer = (e) => {
    setNameServer(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const onCodeInputChange = (e) => {
    setServerCode(e.target.value);
  };

  const handleCreateServer = () => {
    const data = {
      name: nameServer,
      description: description,
      isPublic: true,
    };

    dispatch(createServerAction(data));

    modal.hide();
  };

  const handleJoinServer = () => {
    NiceModal.hide(LoadingModal);
    serverAPI
      .joinServerWithCode(serverCode)
      .then(() => {
        NiceModal.hide(LoadingModal);
        toast.success('Join server successfully');
        dispatch(getListJoinedServerAction());

        modal.hide();
      })
      .catch((err) => {
        console.log(err);
        NiceModal.hide(LoadingModal);
      });
  };

  return (
    <Dialog {...muiDialogV5(modal)}>
      <Container sx={{ position: 'relative', width: 400 }}>
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
        <DialogTitle align="center">Create new Server</DialogTitle>
        <DialogContent>
          <Stack p={1} spacing={2}>
            <TextField
              onChange={handleNameServer}
              label="Server Name"
              variant="outlined"
            />
            <TextField
              onChange={handleDescription}
              multiline
              label="Description"
              variant="outlined"
            />
          </Stack>

          <Stack direction="row-reverse" pb={2}>
            <Button onClick={handleCreateServer} variant="contained">
              Create
            </Button>
          </Stack>

          <Divider sx={{ marginY: 2 }} />

          <Stack>
            <Typography pt={1} fontWeight={500} fontSize={18}>
              Join a server with code
            </Typography>

            <TextField
              sx={{ mt: 2 }}
              onChange={onCodeInputChange}
              multiline
              margin="dense"
              label="Server code"
              variant="outlined"
            />
            <Stack direction="row-reverse" py={1}>
              <Button onClick={handleJoinServer} variant="contained">
                Join Server
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Container>
    </Dialog>
  );
});

export default AddServerDialog;
