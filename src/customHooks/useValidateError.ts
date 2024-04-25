import { useDispatch } from 'react-redux';
import { AppDispatch } from "../store/store";
import { showSnackbar } from '../store/notifications/notificationsSlice';
import { CustomError } from '../interfaces/interfaces';
import useLogout from './useLogout';

const useValidateError = () => {
  const dispatch = useDispatch<AppDispatch>();
  const logout = useLogout();

  const ValidateError = (error: CustomError) => {
    if (!error.status || !error.msg) {
      return;
    }

    if (
      error.status === 401 ||
      error.status === 403 ||
      error.status === 404
    ) {
      logout();
    }

    dispatch(showSnackbar(error.msg));
  }

  return ValidateError;
};

export default useValidateError;