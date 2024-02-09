import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { deleteNuzlocke, fetchNuzlockes, setNuzlockes } from "../../store/nuzlockes/nuzlockesSlice";
import { showSnackbar } from "../../store/notifications/notificationsSlice";
import { CustomError } from '../../interfaces/interfaces';
import { Grid, Button, Divider } from "@mui/material";
import MultiuseText from "../MultiuseText";
import DeleteDialog from "../DeleteDialog";

interface Props {
  GoTo: (e: string) => void;
  ValidateError: (e: CustomError) => void;
}

function Nuzlocke(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const nuzlocke = useSelector((state: RootState) => state.nuzlockes.nuzlocke)!;

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const GoToEditNuzlocke = () => {
    props.GoTo(`nuzlockes/nuzlocke/${nuzlocke._id}/nuzlocke-form`);
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
            props.GoTo("nuzlockes");
          });
      })
      .catch(error => {
        props.ValidateError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      {
        nuzlocke && (
          <>
            <MultiuseText text={`${nuzlocke.name} - ${nuzlocke.game}`} justify="center" />
            <Divider sx={{ margin: "12px 0" }} />
            <Grid className="action-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
              <Button color='secondary' variant='contained' onClick={GoToEditNuzlocke}>
                Update nuzlocke
              </Button>
            </Grid>
            <Grid className="action-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
              <Button color='error' variant="outlined" onClick={HandleShowDeleteDialog}>
                Delete nuzlocke
              </Button>
            </Grid>
            <DeleteDialog HandleShowDeleteDialog={HandleShowDeleteDialog} HandleDelete={HandleDelete} show={showDeleteDialog} name={nuzlocke.name} loading={loading} />
          </>
        )
      }
    </>
  );
}

export default Nuzlocke;