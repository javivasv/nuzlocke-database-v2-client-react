
import { useState, FormEvent, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import useGoTo from '../../customHooks/useGoTo';
import useYupValidation from '../../customHooks/useYupValidation';
import * as Yup from 'yup';
import { AppDispatch } from '../../store/store';
import { register } from '../../store/auth/authSlice';
import { showSnackbar } from '../../store/notifications/notificationsSlice';
import { Button, Grid, TextField, Divider } from '@mui/material';
import MultiuseText from '../MultiuseText';

function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('');
  const goTo = useGoTo();

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,'Invalid email address'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string().required('Password confirmation is required').oneOf([password], 'Passwords must match'),
  });

  const { ValidateField, ValidateForm } = useYupValidation(validationSchema);

  const validateForm = async () => {
    const errors = await ValidateForm({ email, username, password, passwordConfirmation });
    setEmailError(errors.email);
    setUsernameError(errors.username);
    setPasswordError(errors.password);
    setPasswordConfirmationError(errors.passwordConfirmation);
    return !errors.email && !errors.username && !errors.password && !errors.passwordConfirmation;
  };

  const HandleEmailChange = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
    const error = await ValidateField('email', target.value);
    setEmailError(error);
  }

  const HandleUsernameChange = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setUsername(target.value);
    const error = await ValidateField('username', target.value);
    setUsernameError(error);
  }

  const HandlePasswordChange = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
    const error = await ValidateField('password', target.value);
    setPasswordError(error);
  }

  const HandlePasswordConfirmationChange = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setPasswordConfirmation(target.value);
    const error = await ValidateField('passwordConfirmation', target.value);
    setPasswordConfirmationError(error);
  }

  const HandleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await validateForm();

    if (!isValid) {
      return;
    }

    setLoading(true);

    dispatch(register({
      email,
      username,
      password,
    }))
      .unwrap()
      .then(res => {
        dispatch(showSnackbar(res.msg));
        goTo("login");
      })
      .catch(error => {
        dispatch(showSnackbar(error.msg));
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <form className="w-100" data-testid="test-register-form" noValidate onSubmit={HandleRegister}>
      <Grid container item flexDirection={"column"}>
        <MultiuseText text="Email" />
        <Grid className="input-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
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
            inputProps={{ "data-testid": "test-email-input" }}
            onChange={HandleEmailChange}
          />
        </Grid>
        <MultiuseText text="Username" />
        <Grid className="input-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <TextField
            value={username}
            name="username"
            variant="outlined"
            fullWidth
            size='small'
            color='secondary'
            disabled={loading}
            error={Boolean(usernameError)}
            helperText={usernameError}
            inputProps={{ "data-testid": "test-username-input" }}
            onChange={HandleUsernameChange}
          />
        </Grid>
        <MultiuseText text="Password" />
        <Grid className="input-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
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
            inputProps={{ "data-testid": "test-password-input" }}
            onChange={HandlePasswordChange}
          />
        </Grid>
        <MultiuseText text="Password confirmation" />
        <Grid className="input-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
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
            inputProps={{ "data-testid": "test-password-confirmation-input" }}
            onChange={HandlePasswordConfirmationChange}
          />
        </Grid>
        <Grid className="action-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <Button color='primary' variant='contained' disabled={loading} type="submit">
            Register
          </Button>
        </Grid>
        <Grid className="auth-extra-actions-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <span>
            { "Already have an account? " }
          </span>
          <span className="auth-extra-action" onClick={() => goTo("login")}>
            Login
          </span>
          <Divider className="vertical-divider" orientation="vertical" flexItem />
          <span className="auth-extra-action" onClick={() => goTo("home")}>
            Home
          </span>
        </Grid>
      </Grid>
    </form>
  );
}
  
export default Register;
  