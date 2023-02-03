import * as React from 'react';
import {
  DialogTitle,
  DialogContent,
  IconButton,
  Dialog,
  Container, TextField, Stack, Button, Typography,
  FormControl, RadioGroup, FormControlLabel, Radio, Switch, Divider
} from '@mui/material';
import {Close as CloseIcon} from '@mui/icons-material';
import NiceModal, {useModal} from '@ebay/nice-modal-react';
import LockIcon from '@mui/icons-material/Lock';


const AddChannelDialog = NiceModal.create(() => {
  const modal = useModal();
  const [nameChannel, setNameChannel] = React.useState(null)
  const [description, setDescription] = React.useState(null)
  const [channelType, setChannelType] = React.useState('text')
  const [isPrivate, setIsPeivate] = React.useState(false)

  const handleNameChannel = (e) => {
    setNameChannel(e.target.value)
  }
  const handleDescription = (e) => {
    setDescription(e.target.value)
  }
  const handleChangeType = (e) => {
    setChannelType(e.target.value)
  }

  const handlePrivateChannel = (e) => {
    setIsPeivate(e.target.checked)
  }
  const handleSubmitCreateChannel = () => {
    const data = {
      'name': nameChannel,
      'description': description,
      'type' : channelType,
      'isPublic': !isPrivate,
    }
    console.log(data)
    modal.hide()
  }


  return (
    <Dialog open={modal.visible} onClose={() => modal.hide()}>
      <Container sx={{position: 'relative', width: 500}}>
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
        <DialogTitle align='center'>Create Channel</DialogTitle>
        <DialogContent>
          <Typography fontWeight={500} fontSize={16}>Channel type</Typography>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={channelType}
              onChange={handleChangeType}
            >
              <FormControlLabel value="text" control={<Radio/>} label="Text"/>
              <FormControlLabel value="voice" control={<Radio/>} label="Voice"/>
            </RadioGroup>
          </FormControl>
          <Stack spacing={1.5} pt={1}>
            <TextField onChange={handleNameChannel} id="outlined-basic" label="Channel Name" variant="outlined"/>
            <TextField onChange={handleDescription} multiline id="outlined-basic" label="Description"
                       variant="outlined"/>
          </Stack>
          <Stack direction='row' justifyContent='space-between' alignItems='center' pt={1}>
            <Stack direction='row' alignItems='center' spacing={0.5}>
              <LockIcon/>
              <Typography>Private Channel</Typography>
            </Stack>
            <Stack>
              <FormControlLabel control={<Switch checked={isPrivate} onChange={handlePrivateChannel}></Switch>}/>
            </Stack>
          </Stack>
        </DialogContent>
        <Stack direction='row-reverse' pb={2}>
          <Button onClick={handleSubmitCreateChannel} variant='contained'>Create</Button>
        </Stack>
      </Container>

    </Dialog>
  );
});

export default AddChannelDialog;
