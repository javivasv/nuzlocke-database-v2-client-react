import { useState, FormEvent, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import useGoTo from '../../customHooks/useGoTo';
import useYupValidation from '../../customHooks/useYupValidation';
import * as Yup from 'yup';
import { AppDispatch } from '../../store/store';
import { forgotPassword } from '../../store/auth/authSlice';
import { showSnackbar } from '../../store/notifications/notificationsSlice';
import { Button, Grid, TextField, Divider } from '@mui/material';
import MultiuseText from '../MultiuseText';

function ForgotPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const goTo = useGoTo();

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,'Invalid email address'),
  });

  const { ValidateField, ValidateForm } = useYupValidation(validationSchema);

  const validateForm = async () => {
    const errors = await ValidateForm({ email });
    setEmailError(errors.email);
    return !errors.email;
  };

  const HandleEmailChange = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
    const error = await ValidateField('email', target.value);
    setEmailError(error);
  }

  const HandleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await validateForm();

    if (!isValid) {
      return;
    }

    setLoading(true);

    dispatch(forgotPassword({
      email,
    }))
      .unwrap()
      .then(res => {
        dispatch(showSnackbar(res.msg));
      })
      .catch(error => {
        dispatch(showSnackbar(error.msg));
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <form className="w-100" data-testid="test-forgot-password-form" noValidate onSubmit={HandleForgotPassword}>
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
        <Grid className="action-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <Button color='primary' variant='contained' disabled={loading} type="submit">
            Send email
          </Button>
        </Grid>
        <Grid className="auth-extra-actions-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
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
  
export default ForgotPassword;
  