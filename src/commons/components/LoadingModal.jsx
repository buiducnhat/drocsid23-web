import * as React from 'react';
import { Container, Dialog } from '@mui/material';
import LoadingSvg from 'src/assets/images/loading.svg';

import NiceModal, { useModal } from '@ebay/nice-modal-react';

const LoadingModal = NiceModal.create(() => {
  const modal = useModal();

  return (
    <Dialog open={modal.visible} onClose={() => modal.hide()}>
      <Container sx={{ position: 'relative' }}>
        <img src={LoadingSvg} alt="loading" />
      </Container>
    </Dialog>
  );
});

export default LoadingModal;
