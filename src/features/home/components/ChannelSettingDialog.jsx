import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Container,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  DialogActions,
  Button,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import React, { useEffect } from 'react';
import serverAPI from 'src/features/server/serverAPI';
import LoadingModal from 'src/commons/components/LoadingModal';
import { useDispatch } from 'react-redux';
import { updateChannelAction } from 'src/features/server/serverSlice';

const ChannelSettingDialog = NiceModal.create(({ channelId }) => {
  const modal = useModal();
  const dispatch = useDispatch();

  const [channelDetail, setChannelDetail] = React.useState(null);

  const [input, setInput] = React.useState({
    name: channelDetail?.name,
    description: channelDetail?.description,
  });

  useEffect(() => {
    NiceModal.show(LoadingModal);

    serverAPI.getChannelInfo(channelId).then((res) => {
      setChannelDetail(res.data.data);
      setInput({
        name: res.data.data.name,
        description: res.data.data.description,
      });
      NiceModal.hide(LoadingModal);
    });
  }, []);

  const handleSubmit = () => {
    dispatch(updateChannelAction({ id: channelId, data: input }));
  };

  return (
    <Dialog {...muiDialogV5(modal)}>
      {channelDetail && (
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
          <DialogTitle>Channel settings</DialogTitle>

          <DialogContent>
            <TextField
              fullWidth
              label="Channel name"
              variant="outlined"
              margin="dense"
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />

            <FormControl sx={{ mt: 2 }}>
              <FormLabel>Channel type</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  value="text"
                  control={<Radio readOnly />}
                  label="Text"
                  checked={channelDetail?.type === 'text'}
                />
                <FormControlLabel
                  value="voice"
                  control={<Radio readOnly />}
                  label="Voice"
                  checked={channelDetail?.type === 'voice'}
                />
              </RadioGroup>
            </FormControl>

            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              margin="dense"
              multiline
              value={input.description}
              onChange={(e) =>
                setInput({ ...input, description: e.target.value })
              }
              maxRows={4}
              sx={{ marginTop: 2 }}
            />
          </DialogContent>

          <DialogActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={() => modal.hide()}>
              Cancel
            </Button>

            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </DialogActions>
        </Container>
      )}
    </Dialog>
  );
});

export default ChannelSettingDialog;
