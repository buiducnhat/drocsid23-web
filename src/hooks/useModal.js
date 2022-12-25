import { useDispatch, useSelector } from 'react-redux';

import { openModal, closeModal } from 'src/features/app/appSlice';

function useCheckAuth() {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.app.isOpenModal);
  const modalType = useSelector((state) => state.app.modalType);
  const modalProps = useSelector((state) => state.app.modalProps);

  const open = (modalType, modalProps) => {
    dispatch(openModal({ modalType, modalProps }));
  };

  const close = () => {
    dispatch(closeModal());
  };

  return { isOpen, modalProps, modalType, open, close };
}

export default useCheckAuth;
