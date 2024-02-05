
import { useState, FormEvent, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { AppDispatch } from '../../store/store';
import { login } from '../../store/auth/authSlice';
import { showSnackbar } from '../../store/notifications/notificationsSlice';
import { Button, Grid, TextField, Divider } from '@mui/material';
import MultiuseText from '../MultiuseText';

interface Props {
  GoTo: (e: string) => void;
}

function Login(props: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,'Invalid email address'),
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

    setLoading(true);

    const isValid = await validateForm();

    if (!isValid) {
      return;
    }

    dispatch(login({
      email,
      password,
    })).unwrap()
      .then(() => {})
      .catch(error => {
        dispatch(showSnackbar(error));
      })
      .finally(() => {
        setLoading(false);
      });
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
            disabled={loading}
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
            disabled={loading}
            error={Boolean(passwordError)}
            helperText={passwordError}
            onChange={HandlePasswordChange}
          />
        </Grid>
        <Grid className="auth-actions-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <Button color='primary' variant='contained' disabled={loading} type="submit">Login</Button>
        </Grid>
        <Grid className="auth-forgot-password-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <span className="auth-extra-action" onClick={() => props.GoTo("forgot-password")}>
            Forgot password
          </span>
        </Grid>
        <Grid className="auth-extra-actions-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <span className="auth-extra-action-text">
            Don't have an account?
          </span>
          <span className="auth-extra-action" onClick={() => props.GoTo("register")}>
            Register
          </span>
          <Divider orientation="vertical" flexItem sx={{ margin: "0 12px" }} />
          <span className="auth-extra-action" onClick={() => props.GoTo("home")}>
            Home
          </span>
        </Grid>
      </Grid>
    </form>
  );
}
  
export default Login;
  