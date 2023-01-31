import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectUserData,
  selectIsAuth,
  getMeAction,
} from 'src/features/authen/authenSlice';
import { hideLoadingModal, showLoadingModal } from 'src/helpers/modal.helper';

function useCheckAuth() {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(selectUserData);
  const isGetMe = useSelector((state) => state.authen.isGetMe);

  useEffect(() => {
    dispatch(getMeAction());
  }, [dispatch]);

  useEffect(() => {
    if (isGetMe) {
      showLoadingModal();
    } else {
      hideLoadingModal();
    }
  }, [isGetMe]);

  return { isAuth, userData, isGetMe };
}

export default useCheckAuth;
