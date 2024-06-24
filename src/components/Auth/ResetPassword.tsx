import { useState, useEffect, FormEvent, SyntheticEvent } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import useGoTo from '../../customHooks/useGoTo';
import * as Yup from 'yup';
import { AppDispatch } from '../../store/store';
import { validateResetToken, resetPassword } from '../../store/auth/authSlice';
import { showSnackbar } from '../../store/notifications/notificationsSlice';
import { Button, Grid, TextField, Divider } from '@mui/material';
import MultiuseText from '../MultiuseText';
import LoadingRow from '../LoadingRow';

function ResetPassword() {
  const { resetToken } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const goTo = useGoTo();

  useEffect(() => {
    const data = {
      resetToken: resetToken || "",
    }

    dispatch(validateResetToken(data))
      .unwrap()
      .then(res => {
        setEmail(res);
      })
      .catch(error => {
        dispatch(showSnackbar(error.msg));
        setErrorMsg(error.msg);
      })
      .finally(() => {
        setLoadingToken(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [loadingToken, setLoadingToken] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('');
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
    const isValid = await validateForm();

    if (!isValid) {
      return;
    }

    setLoading(true);
    
    dispatch(resetPassword({
      email,
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
    <form className="w-100" data-testid="test-reset-password-form" noValidate onSubmit={HandleResetPassword}>
      <Grid container item flexDirection={"column"}>
        {
          loadingToken &&
          <LoadingRow />
        }
        {
          !loadingToken &&
          <>
            {
              errorMsg &&
              <MultiuseText text={errorMsg} justify='center' />
            }
            {
              !errorMsg &&
              <>
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
                    Reset password
                  </Button>
                </Grid>
              </>
            }
            <Grid className="auth-extra-actions-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
              <span className="auth-extra-action" onClick={() => goTo("login")}>
                  Login
              </span>
              <Divider className="vertical-divider" orientation="vertical" flexItem />
              <span className="auth-extra-action" onClick={() => goTo("home")}>
                  Home
              </span>
            </Grid>
          </>
        }
      </Grid>
    </form>
  );
}
  
export default ResetPassword;