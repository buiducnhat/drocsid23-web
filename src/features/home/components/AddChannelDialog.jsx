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
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import { useDispatch } from 'react-redux';
import { createChannelAction } from 'src/features/server/serverSlice';

const AddChannelDialog = NiceModal.create(({ serverId }) => {
  const modal = useModal();
  const [nameChannel, setNameChannel] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [channelType, setChannelType] = React.useState('text');
  const dispatch = useDispatch();

  const handleNameChannel = (e) => {
    setNameChannel(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeType = (e) => {
    setChannelType(e.target.value);
  };

  const handleSubmitCreateChannel = () => {
    const data = {
      serverId,
      name: nameChannel,
      description: description,
      type: channelType,
    };
    dispatch(createChannelAction(data));

    modal.hide();
  };

  return (
    <Dialog {...muiDialogV5(modal)}>
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
        <DialogTitle align="center">Create Channel</DialogTitle>
        <DialogContent>
          <Typography fontWeight={500} fontSize={16}>
            Channel type
          </Typography>
          <FormControl>
            <RadioGroup value={channelType} onChange={handleChangeType}>
              <FormControlLabel value="text" control={<Radio />} label="Text" />
              <FormControlLabel
                value="voice"
                control={<Radio />}
                label="Voice"
              />
            </RadioGroup>
          </FormControl>
          <Stack spacing={1.5} pt={1}>
            <TextField
              onChange={handleNameChannel}
              id="outlined-basic"
              label="Channel Name"
              variant="outlined"
            />
            <TextField
              onChange={handleDescription}
              multiline
              id="outlined-basic"
              label="Description"
              variant="outlined"
            />
          </Stack>
        </DialogContent>
        <Stack direction="row-reverse" pb={2}>
          <Button onClick={handleSubmitCreateChannel} variant="contained">
            Create
          </Button>
        </Stack>
      </Container>
    </Dialog>
  );
});

export default AddChannelDialog;
