import { useDispatch } from 'react-redux';
import { AppDispatch } from "../store/store";
import { setUser } from '../store/auth/authSlice';
import { setNuzlockes } from '../store/nuzlockes/nuzlockesSlice';
import useGoTo from './useGoTo';

const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const goTo = useGoTo();

  const Logout = () => {
    window.localStorage.removeItem("ndb_token");
    dispatch(setUser(null));
    dispatch(setNuzlockes([]));
    goTo("home");
  };

  return Logout;
};

export default useLogout;