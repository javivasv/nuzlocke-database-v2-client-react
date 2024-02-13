import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "../../store/store";
import { hideSnackbar } from '../../store/notifications/notificationsSlice';
import { Snackbar } from '@mui/material';

function NotificationSnackbar() {
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useSelector((state: RootState) => state.notifications);

  const HandleCloseSnackbar = () => {
    dispatch(hideSnackbar());
  }

  return (
    <Snackbar
      open={notifications.openSnackbar}
      message={notifications.snackbarText}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      ContentProps={{
        sx: {
          display: 'block',
          textAlign: "center",
          minWidth: "0px !important"
        }
      }}
      onClose={HandleCloseSnackbar}
    />
  )
}

export default NotificationSnackbar;
