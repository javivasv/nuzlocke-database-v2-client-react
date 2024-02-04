
import { useState, FormEvent, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { AppDispatch } from '../../store/store';
import { login } from '../../store/auth/authSlice';
import { Button, Grid, TextField } from '@mui/material';
import MultiuseText from '../MultiuseText';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string().matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,'Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
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
    const passwordError = await validateField('password', password);

    setEmailError(emailError);
    setPasswordError(passwordError);

    return !emailError && !passwordError;
  };

  const HandleEmailChange = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
    const error = await validateField('email', target.value);
    setEmailError(error);
  }

  const HandlePasswordChange = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
    const error = await validateField('password', target.value);
    setPasswordError(error);
  }

  const HandleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = await validateForm();

    if (!isValid) {
      return;
    }

    dispatch(login({
      email,
      password,
    })).unwrap().then(() => {}).catch(() => {});
  }

  const ToRegister = () => {
    navigate(`/register`);
  }

  return (
    <form className="w-100" noValidate onSubmit={HandleLogin}>
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
        <Grid className="auth-actions-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <Button color='primary' variant='contained' type="submit">Login</Button>
        </Grid>
        <Grid className="auth-extra-actions-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <span>
            Don't have an account?
            <span className="auth-extra-action" onClick={ToRegister}>
              Register
            </span>
          </span>
        </Grid>
      </Grid>
    </form>
  );
}
  
export default Login;
  