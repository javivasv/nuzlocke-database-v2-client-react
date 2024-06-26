import { useState, useEffect, SyntheticEvent, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import useGoTo from '../../customHooks/useGoTo';
import useValidateError from '../../customHooks/useValidateError';
import * as Yup from 'yup';
import { AppDispatch } from "../../store/store";
import { fetchNuzlocke, createNuzlocke, updateNuzlocke, setNuzlockes, setNuzlocke } from "../../store/nuzlockes/nuzlockesSlice";
import { showSnackbar } from '../../store/notifications/notificationsSlice';
import { Grid, Card, TextField, Button } from "@mui/material";
import MultiuseText from "../MultiuseText";

function NuzlockeForm() {
  const { nuzlockeId } = useParams();
  const dispatch = useDispatch<AppDispatch>()
  const [name, setName] = useState("");
  const [game, setGame] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [gameError, setGameError] = useState('');
  const goTo = useGoTo();
  const validateError = useValidateError();
  const editMode = nuzlockeId ? true : false;

  useEffect(() => {
    if (nuzlockeId) {
      dispatch(fetchNuzlocke(nuzlockeId))
        .unwrap()
        .then(res => {
          dispatch(setNuzlocke(res.nuzlocke));
          setName(res.nuzlocke.name);
          setGame(res.nuzlocke.game);
          setDescription(res.nuzlocke.description);
        })
        .catch(error => {
          validateError(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const HandleSubmitNuzlocke = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await validateForm();

    if (!isValid) {
      return;
    }

    setLoading(true);

    const data = {
      name,
      game,
      description,
    }

    if (editMode) {
      const editData = {
        nuzlocke: {
          ...data,
        },
        nuzlockeId: nuzlockeId!,
      }

      dispatch(updateNuzlocke(editData))
        .unwrap()
        .then(res => {
          dispatch(setNuzlocke(res.nuzlocke));
          dispatch(showSnackbar(res.msg));
          goTo(`nuzlockes/nuzlocke/${nuzlockeId}`);
        })
        .catch(error => {
          validateError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      dispatch(createNuzlocke(data))
        .unwrap()
        .then(res => {
          dispatch(setNuzlockes(res.nuzlockes));
          dispatch(showSnackbar(res.msg));
          goTo("nuzlockes");
        })
        .catch(error => {
          validateError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <Grid container flexDirection={"row"} alignItems="center" justifyContent="center">
      <Card className='main-content-card'>
        <form className="w-100" noValidate onSubmit={HandleSubmitNuzlocke}>
          <Grid container item flexDirection={"column"}>
            <MultiuseText text="Name" />
            <Grid className="input-row" container item flexDirection={"row"}>
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
            <MultiuseText text="Game" />
            <Grid className="input-row" container item flexDirection={"row"}>
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
            <MultiuseText text="Description" />
            <Grid className="input-row" container item flexDirection={"row"}>
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
            <Grid className="action-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
              <Button color='secondary' variant='contained' disabled={loading} type="submit">
                { editMode ? "Update nuzlocke" : "Create nuzlocke" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Grid>
  );
}

export default NuzlockeForm;