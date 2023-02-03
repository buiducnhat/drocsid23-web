import * as React from 'react';
import {
  DialogTitle,
  DialogContent,
  IconButton,
  Dialog,
  Container, TextField, Stack, Button
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {useDispatch} from "react-redux";


const AddServerDialog = NiceModal.create(() => {
  const modal = useModal();
  const [nameServer,setNameServer] = React.useState(null)
  const [description,setDescription] = React.useState(null)

  const handleNameServer = (e) => {
    setNameServer(e.target.value)
  }

  const dispatch = useDispatch();

  const handleCreateServer = () => {
    const data = {
      'name' : nameServer,
      'description': description,
      'isPublic' : true
    }
    console.log(data)
    modal.hide()
  }

  const handleDescription = (e) => {
    setDescription(e.target.value)
  }

  return (
    <Dialog open={modal.visible} onClose={() => modal.hide()}>
      <Container sx={{ position: 'relative', width:400 }}>
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
        <DialogTitle align='center'>Create new Server</DialogTitle>
        <DialogContent>
          <Stack p={1} spacing={2}>
          <TextField onChange={handleNameServer} id="outlined-basic" label="Server Name" variant="outlined" />
          <TextField onChange={handleDescription} multiline={3} id="outlined-basic" label="Description" variant="outlined" />
          </Stack>
        </DialogContent>
        <Stack direction='row-reverse' pb={2}>
          <Button onClick={handleCreateServer} variant='contained'>Create</Button>
        </Stack>
      </Container>
    </Dialog>
  );
});

export default AddServerDialog;
