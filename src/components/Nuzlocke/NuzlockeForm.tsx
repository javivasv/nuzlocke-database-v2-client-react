import { useState, SyntheticEvent, FormEvent } from "react";
import * as Yup from 'yup';
import { Grid, Card, TextField, Button } from "@mui/material";
import { CustomError } from "../../interfaces/interfaces";
import MultiuseText from "../MultiuseText";

interface Props {
  ValidateError: (e: CustomError) => void;
}

function NuzlockeForm(props: Props) {
  
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState('');

  const [game, setGame] = useState("");
  const [gameError, setGameError] = useState('');

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    game: Yup.string().required('Game is required'),
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
    const nameError = await validateField('name', name);
    const gameError = await validateField('game', game);

    setNameError(nameError);
    setGameError(gameError);

    return !nameError && !gameError;
  };

  const HandleNameChange = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setName(target.value);
    const error = await validateField('name', target.value);
    setNameError(error);
  }

  const HandleGameChange = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setGame(target.value);
    const error = await validateField('game', target.value);
    setGameError(error);
  }

  const HandleDescriptionChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setDescription(target.value);
  }

  const HandleCreateNuzlocke = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const isValid = await validateForm();

    if (!isValid) {
      return;
    }
  }

  return (
    <Grid container flexDirection={"row"} alignItems="center" justifyContent="center">
      <Card className='main-content-card'>
        <form className="w-100" noValidate onSubmit={HandleCreateNuzlocke}>
          <Grid container item flexDirection={"column"}>
            <MultiuseText text="Name"></MultiuseText>
            <Grid className="form-input-row" container item flexDirection={"row"}>
              <TextField
                value={name}
                name="name"
                variant="outlined"
                fullWidth
                size='small'
                color='secondary'
                disabled={loading}
                error={Boolean(nameError)}
                helperText={nameError}
                onChange={HandleNameChange}
              />
            </Grid>
            <MultiuseText text="Game"></MultiuseText>
            <Grid className="form-input-row" container item flexDirection={"row"}>
              <TextField
                value={game}
                name="game"
                variant="outlined"
                fullWidth
                size='small'
                color='secondary'
                disabled={loading}
                error={Boolean(gameError)}
                helperText={gameError}
                onChange={HandleGameChange}
              />
            </Grid>
            <MultiuseText text="Description"></MultiuseText>
            <Grid className="form-input-row" container item flexDirection={"row"}>
              <TextField
                value={description}
                name="description"
                variant="outlined"
                fullWidth
                size='small'
                color='secondary'
                multiline
                rows={2}
                disabled={loading}
                onChange={HandleDescriptionChange}
              />
            </Grid>
            <Grid className="form-submit-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
              <Button color='secondary' variant='contained' disabled={loading} type="submit">
                Create nuzlocke
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Grid>
  );
}

export default NuzlockeForm;