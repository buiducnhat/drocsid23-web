import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Container,
  IconButton,
  DialogActions,
  Button,
  Stack,
  Avatar,
  Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import React, { useEffect } from 'react';
import serverAPI from 'src/features/server/serverAPI';
import LoadingModal from 'src/commons/components/LoadingModal';

const ListUserChannel = NiceModal.create(({ channelId }) => {
  const modal = useModal();

  const [channelDetail, setChannelDetail] = React.useState(null);

  useEffect(() => {
    NiceModal.show(LoadingModal);

    serverAPI.getChannelInfo(channelId).then((res) => {
      setChannelDetail(res.data.data);
      NiceModal.hide(LoadingModal);
    });
  }, []);

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
          <DialogTitle>Users of channel</DialogTitle>

          <DialogContent>
            {channelDetail?.users?.map((user) => {
              return (
                <Stack
                  key={user._id}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  mb={1.5}
                >
                  <Avatar src={`https://i.pravatar.cc/150?u=${user._id}`} />

                  <Stack direction="column">
                    <Typography variant="subtitle1" component="h4">
                      {user?.fullname}
                    </Typography>
                    <Typography variant="subtitle2" color="GrayText">
                      {user?.email}
                    </Typography>
                  </Stack>
                </Stack>
              );
            })}
          </DialogContent>

          <DialogActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={() => modal.hide()}>
              OK
            </Button>
          </DialogActions>
        </Container>
      )}
    </Dialog>
  );
});

export default ListUserChannel;
