import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { deleteNuzlocke, updateNuzlocke, fetchNuzlockes, setNuzlockes, setNuzlocke } from "../../store/nuzlockes/nuzlockesSlice";
import { showSnackbar } from "../../store/notifications/notificationsSlice";
import { Grid, Button, Divider } from "@mui/material";
import MultiuseText from "../MultiuseText";
import DeleteDialog from "../DeleteDialog";
import CustomCardContent from "../CustomCardContent";
import useGoTo from '../../customHooks/useGoTo';
import useValidateError from '../../customHooks/useValidateError';

function Nuzlocke() {
  const dispatch = useDispatch<AppDispatch>();
  const nuzlocke = useSelector((state: RootState) => state.nuzlockes.nuzlocke)!;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const goTo = useGoTo();
  const validateError = useValidateError();

  const GoToEditNuzlocke = () => {
    goTo(`nuzlockes/nuzlocke/${nuzlocke._id}/nuzlocke-form`);
  }

  const GoToAddPokemon = () => {
    goTo(`nuzlockes/nuzlocke/${nuzlocke._id}/pokemon-form`);
  }

  const HandleShowDeleteDialog = () => {
    setShowDeleteDialog(!showDeleteDialog);
  }

  const HandleDelete = () => {
    HandleDeleteNuzlocke();
  }

  const HandleDeleteNuzlocke = () => {
    setLoading(true);

    dispatch(deleteNuzlocke(nuzlocke._id!))
      .unwrap()
      .then(res => {
        dispatch(showSnackbar(res.msg));
        dispatch(fetchNuzlockes())
          .unwrap()
          .then(res => {
            dispatch(setNuzlockes(res.nuzlockes));
            goTo("nuzlockes");
          });
      })
      .catch(error => {
        validateError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const HandleUpdateStatus = (status: string) => {
    const data = {
      nuzlockeId: nuzlocke._id!,
      nuzlocke: {
        status,
      },
    };

    setLoading(true);

    dispatch(updateNuzlocke(data))
      .unwrap()
      .then(res => {
        dispatch(setNuzlocke(res.nuzlocke));
        dispatch(showSnackbar(res.msg));
        dispatch(fetchNuzlockes())
          .unwrap()
          .then(res => {
            dispatch(setNuzlockes(res.nuzlockes));
          });
      })
      .catch(error => {
        validateError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <CustomCardContent>
        <MultiuseText text={`${nuzlocke.name} - ${nuzlocke.game}`} justify="center" textAlign="centered" />
      </CustomCardContent>
      <Divider className="horizontal-divider" />
      <Grid className="action-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
        <Button color='secondary' variant='contained' disabled={loading} onClick={GoToEditNuzlocke}>
          Edit nuzlocke
        </Button>
      </Grid>
      <Grid className="action-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
        <Button color='error' variant="outlined" disabled={loading} onClick={HandleShowDeleteDialog}>
          Delete nuzlocke
        </Button>
      </Grid>
      <Divider className="horizontal-divider" />
      <Grid className="action-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
        <Button color='secondary' variant='contained' disabled={loading} onClick={GoToAddPokemon}>
          Add pokemon
        </Button>
      </Grid>
      <Divider className="horizontal-divider" />
      <Grid className="action-row" container item flexDirection={"row"} alignItems="center" justifyContent='space-around'>
        <Button className={nuzlocke.status === "started" ? "current-status" : ""} color='secondary' variant={nuzlocke.status === "started" ? "contained" : "outlined"} disabled={loading} onClick={() => HandleUpdateStatus("started")}>
          Started
        </Button>
        <Button className={nuzlocke.status === "completed" ? "current-status" : ""} color='success' variant={nuzlocke.status === "completed" ? "contained" : "outlined"} disabled={loading} onClick={() => HandleUpdateStatus("completed")}>
          Completed
        </Button>
        <Button className={nuzlocke.status === "lost" ? "current-status" : ""} color='error' variant={nuzlocke.status === "lost" ? "contained" : "outlined"} disabled={loading} onClick={() => HandleUpdateStatus("lost")}>
          Lost
        </Button>
      </Grid>
      {
        nuzlocke.description &&
        <>
          <Divider className="horizontal-divider" />
          <CustomCardContent>
            <span className="card-text">
              { nuzlocke.description }
            </span>
          </CustomCardContent>
        </> 
      }
      <DeleteDialog HandleShowDeleteDialog={HandleShowDeleteDialog} HandleDelete={HandleDelete} show={showDeleteDialog} name={nuzlocke.name} loading={loading} />
    </>
  );
}

export default Nuzlocke;