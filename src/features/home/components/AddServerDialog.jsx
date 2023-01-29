import * as React from 'react';
import {
  DialogTitle,
  DialogContent,
  IconButton,
  Dialog,
  Container,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

const AddServerDialog = NiceModal.create(() => {
  const modal = useModal();

  return (
    <Dialog open={modal.visible} onClose={() => modal.hide()}>
      <Container sx={{ position: 'relative' }}>
        <IconButton
          aria-label="close"
          sx={{
            position: 'absolute',
            top: 16,
            right: 48,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={() => modal.hide()}
        >
          <CloseIcon />
        </IconButton>

        <DialogTitle>Create new Server</DialogTitle>
        <DialogContent></DialogContent>
      </Container>
    </Dialog>
  );
});

export default AddServerDialog;
