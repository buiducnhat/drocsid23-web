import { useSelector } from 'react-redux';

import { selectUserData, selectIsAuth } from 'src/features/authen/authenSlice';

function useCheckAuth() {
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(selectUserData);
  const isGetUserInfor = useSelector((state) => state.authen.isGetUserInfor);

  return { isAuth, userData, isGetUserInfor };
}

export default useCheckAuth;
