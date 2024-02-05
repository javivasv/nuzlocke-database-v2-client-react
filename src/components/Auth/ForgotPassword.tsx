import { useState, FormEvent, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { AppDispatch } from '../../store/store';
import { forgotPassword } from '../../store/auth/authSlice';
import { showSnackbar } from '../../store/notifications/notificationsSlice';
import { Button, Grid, TextField, Divider } from '@mui/material';
import MultiuseText from '../MultiuseText';

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,'Invalid email address'),
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
    const emailError = await validateField('email', email);

    setEmailError(emailError);

    return !emailError;
  };

  const HandleEmailChange = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
    const error = await validateField('email', target.value);
    setEmailError(error);
  }

  const HandleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = await validateForm();

    if (!isValid) {
      return;
    }

    dispatch(forgotPassword({
      email,
    })).unwrap().then(res => {
      dispatch(showSnackbar(res));
    }).catch(error => {
      dispatch(showSnackbar(error));
    });
  }

  const ToLogin = () => {
    navigate(`/login`);
  }

  const ToHome = () => {
    navigate(`/home`);
  }

  return (
    <form className="w-100" noValidate onSubmit={HandleForgotPassword}>
      <Grid container item flexDirection={"column"}>
        <MultiuseText text="Email"></MultiuseText>
        <Grid className="auth-input-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <TextField
            value={email}
            name="email"
            variant="outlined"
            fullWidth
            size='small'
            color='secondary'
            error={Boolean(emailError)}
            helperText={emailError}
            onChange={HandleEmailChange}
          />
        </Grid>
        <Grid className="auth-actions-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <Button color='primary' variant='contained' type="submit">Send email</Button>
        </Grid>
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
  
export default ForgotPassword;
  