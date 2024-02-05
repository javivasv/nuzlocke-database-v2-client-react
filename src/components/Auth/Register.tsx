
import { useState, FormEvent, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { AppDispatch } from '../../store/store';
import { register } from '../../store/auth/authSlice';
import { showSnackbar } from '../../store/notifications/notificationsSlice';
import { Button, Grid, TextField, Divider } from '@mui/material';
import MultiuseText from '../MultiuseText';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState('');

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');

  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string().matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,'Invalid email address').required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string().oneOf([password], 'Passwords must match').required('Password confirmation is required'),
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
    const usernameError = await validateField('username', username);
    const passwordError = await validateField('password', password);
    const passwordConfirmationError = await validateField('passwordConfirmation', passwordConfirmation);

    setEmailError(emailError);
    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setPasswordConfirmationError(passwordConfirmationError);

    return !emailError && !usernameError && !passwordError && !passwordConfirmationError;
  };

  const HandleEmailChange = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
    const error = await validateField('email', target.value);
    setEmailError(error);
  }

  const HandleUsernameChange = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setUsername(target.value);
    const error = await validateField('username', target.value);
    setUsernameError(error);
  }

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

  const HandleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = await validateForm();

    if (!isValid) {
      return;
    }

    dispatch(register({
      email,
      username,
      password,
    })).unwrap().then(res => {
      dispatch(showSnackbar(res));
      ToLogin();
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
    <form className="w-100" noValidate onSubmit={HandleRegister}>
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
        <MultiuseText text="Username"></MultiuseText>
        <Grid className="auth-input-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <TextField
            value={username}
            name="username"
            variant="outlined"
            fullWidth
            size='small'
            color='secondary'
            error={Boolean(usernameError)}
            helperText={usernameError}
            onChange={HandleUsernameChange}
          />
        </Grid>
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
            error={Boolean(passwordConfirmationError)}
            helperText={passwordConfirmationError}
            onChange={HandlePasswordConfirmationChange}
          />
        </Grid>
        <Grid className="auth-actions-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <Button color='primary' variant='contained' type="submit">Register</Button>
        </Grid>
        <Grid className="auth-extra-actions-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <span className="auth-extra-action-text">
            Already have an account?
          </span>
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
  
export default Register;
  