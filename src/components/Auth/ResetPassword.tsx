import { useState, useEffect, FormEvent, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import { AppDispatch } from '../../store/store';
import { validateResetToken, resetPassword } from '../../store/auth/authSlice';
import { showSnackbar } from '../../store/notifications/notificationsSlice';
import { Button, Grid, TextField, Divider } from '@mui/material';
import MultiuseText from '../MultiuseText';

function ResetPassword() {
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(validateResetToken(resetToken || "")).unwrap()
      .then(res => {
        setEmail(res);
      })
      .catch(error => {
        dispatch(showSnackbar(error));
        setErrorMsg(error);
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');

  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('');

  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const validationSchema = Yup.object({
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string().required('Password confirmation is required').oneOf([password], 'Passwords must match'),
  });

  const validateField = async (field: string, value: string) => {
    try {
      await validationSchema.validateAt(field, { [field]: value });
      return '';
    } catch (error) {
      return (error as Yup.ValidationError).message;
    }
  };

  const validateForm = async () => {
    const passwordError = await validateField('password', password);
    const passwordConfirmationError = await validateField('passwordConfirmation', passwordConfirmation);

    setPasswordError(passwordError);
    setPasswordConfirmationError(passwordConfirmationError);

    return !passwordError && !passwordConfirmationError;
  };

  const HandlePasswordChange = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
    const error = await validateField('password', target.value);
    setPasswordError(error);
  }
  const HandlePasswordConfirmationChange = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setPasswordConfirmation(target.value);
    const error = await validateField('passwordConfirmation', target.value);
    setPasswordConfirmationError(error);
  }

  const HandleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const isValid = await validateForm();

    if (!isValid) {
      return;
    }

    
    dispatch(resetPassword({
      email,
      password,
    })).unwrap()
      .then(res => {
        dispatch(showSnackbar(res));
        ToLogin();
      })
      .catch(error => {
        dispatch(showSnackbar(error));
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const ToLogin = () => {
    navigate(`/login`);
  }

  const ToHome = () => {
    navigate(`/home`);
  }

  return (
    <form className="w-100" noValidate onSubmit={HandleResetPassword}>
      <Grid container item flexDirection={"column"}>
        {errorMsg &&
          <MultiuseText text={errorMsg} justify='center'></MultiuseText>
        }
        {!errorMsg &&
          <>
            <MultiuseText text="Password"></MultiuseText>
            <Grid className="auth-input-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
              <TextField
                value={password}
                name="password"
                variant="outlined"
                type="password"
                fullWidth
                size='small'
                color='secondary'
                disabled={loading}
                error={Boolean(passwordError)}
                helperText={passwordError}
                onChange={HandlePasswordChange}
              />
            </Grid>
            <MultiuseText text="Password confirmation"></MultiuseText>
            <Grid className="auth-input-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
              <TextField
                value={passwordConfirmation}
                name="passwordConfirmation"
                variant="outlined"
                type="password"
                fullWidth
                size='small'
                color='secondary'
                disabled={loading}
                error={Boolean(passwordConfirmationError)}
                helperText={passwordConfirmationError}
                onChange={HandlePasswordConfirmationChange}
              />
            </Grid>
            <Grid className="auth-actions-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
              <Button color='primary' variant='contained' disabled={loading} type="submit">Reset password</Button>
            </Grid></>
        }
        <Grid className="auth-extra-actions-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <span className="auth-extra-action" onClick={ToLogin}>
              Login
          </span>
          <Divider orientation="vertical" flexItem sx={{ margin: "0 12px" }} />
          <span className="auth-extra-action" onClick={ToHome}>
              Home
          </span>
        </Grid>
      </Grid>
    </form>
  );
}
  
export default ResetPassword;