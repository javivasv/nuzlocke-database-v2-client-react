import { useState, FormEvent, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { CustomError } from '../../interfaces/interfaces';
import { sendFeedback } from '../../store/suggestions/suggestionsSlice';
import { showSnackbar } from '../../store/notifications/notificationsSlice';
import { Grid, TextField, Button } from "@mui/material";
import MultiuseText from "../MultiuseText";

interface Props {
  ValidateError: (e: CustomError) => void;
}

function Feedback(props: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.auth.user);

  const [name, setName] = useState("");

  const [suggestion, setSuggestion] = useState("");

  const [loading, setLoading] = useState(false);

  const HandleNameChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setName(target.value);
  }

  const HandleSuggestionChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSuggestion(target.value);
  }

  const HandleSendFeedback = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (suggestion === "") {
      return;
    }

    setLoading(true);

    const data = {
      name,
      text: suggestion,
      email: user ? user.email : null,
      username: user ? user.username : null,
    }

    dispatch(sendFeedback(data))
      .unwrap()
      .then(res => {
        dispatch(showSnackbar(res.msg));
        setName("");
        setSuggestion("");
      })
      .catch(error => {
        props.ValidateError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <form className="w-100" noValidate onSubmit={HandleSendFeedback}>
      <Grid container item flexDirection={"column"}>
        <MultiuseText text="Name"></MultiuseText>
        <Grid className="feedback-input-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <TextField
            value={name}
            name="name"
            variant="outlined"
            fullWidth
            size='small'
            color='secondary'
            disabled={loading}
            onChange={HandleNameChange}
          />
        </Grid>
        <MultiuseText text="Suggestions"></MultiuseText>
        <Grid className="feedback-input-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <TextField
            value={suggestion}
            name="suggestions"
            variant="outlined"
            fullWidth
            size='small'
            color='secondary'
            multiline
            rows={5}
            disabled={loading}
            onChange={HandleSuggestionChange}
          />
        </Grid>
        <Grid className="action-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <Button color='secondary' variant='contained' disabled={loading} type="submit">
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
  
export default Feedback;
  