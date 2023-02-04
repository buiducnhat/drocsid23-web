import * as React from 'react';
import {
  DialogTitle,
  DialogContent,
  IconButton,
  Dialog,
  Container, TextField, Stack, Button, Divider, Typography, Box
} from '@mui/material';
import {Close as CloseIcon} from '@mui/icons-material';
import PropTypes from 'prop-types';
import NiceModal, {useModal} from '@ebay/nice-modal-react';
import {useDispatch} from "react-redux";


const AddServerDialog = NiceModal.create(() => {
  const modal = useModal();
  const [nameServer, setNameServer] = React.useState(null)
  const [description, setDescription] = React.useState(null)
  const [linkInvite, setLinkInvite] = React.useState(null)

  const handleNameServer = (e) => {
    setNameServer(e.target.value)
  }
  const handleDescription = (e) => {
    setDescription(e.target.value)
  }
  const handleLinkInvite = (e) => {
    setLinkInvite(e.target.value)
  }

  const dispatch = useDispatch();

  const handleCreateServer = () => {
    const data = {
      'name': nameServer,
      'description': description,
      'isPublic': true
    }
    console.log(data)
    modal.hide()
  }

  const handleJoinServer = () => {
    console.log(linkInvite)
    modal.hide()
  }


  return (
    <Dialog open={modal.visible} onClose={() => modal.hide()}>
      <Container sx={{position: 'relative', width: 400}}>
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
          <CloseIcon/>
        </IconButton>
        <DialogTitle align='center'>Create new Server</DialogTitle>
        <DialogContent>
          <Stack p={1} spacing={2}>
            <TextField onChange={handleNameServer} label="Server Name" variant="outlined"/>
            <TextField onChange={handleDescription} multiline label="Description" variant="outlined"/>
          </Stack>

          <Stack direction='row-reverse' pb={2}>
            <Button onClick={handleCreateServer} variant='contained'>Create</Button>
          </Stack>
          <Divider/>
          <Stack>
            <Typography pt={1} fontWeight={500} fontSize={18}>Join a server with link invite</Typography>
            <TextField onChange={handleLinkInvite} multiline label="Link Invite" variant="outlined"/>
            <Stack direction='row-reverse' py={1}>
              <Button onClick={handleJoinServer} variant='contained'>Join Server</Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Container>
    </Dialog>
  );
});

export default AddServerDialog;
