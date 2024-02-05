import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../store/store";
import { Snackbar } from '@mui/material';
import '../../styles/Notifications.css'
import { AppDispatch } from '../../store/store';
import { hideSnackbar } from '../../store/notifications/notificationsSlice';

function NotificationSnackbar() {
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useSelector((state: RootState) => state.notifications);

  const handleCloseSnackbar = () => {
    dispatch(hideSnackbar());
  }

  return (
    <Snackbar
      className="test"
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
      onClose={handleCloseSnackbar}
    />
  )
}

export default NotificationSnackbar;
