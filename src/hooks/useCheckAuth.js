import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectUserData,
  selectIsAuth,
  getMeAction,
} from 'src/features/authen/authenSlice';

function useCheckAuth() {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(selectUserData);
  const isGetMe = useSelector((state) => state.authen.isGetMe);

  useEffect(() => {
    dispatch(getMeAction());
  }, [dispatch]);

  return { isAuth, userData, isGetMe };
}

export default useCheckAuth;
