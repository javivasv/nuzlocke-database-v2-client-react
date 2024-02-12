import { Grid, Dialog, Card, Button } from "@mui/material";
import CustomCardContent from "./CustomCardContent";

interface Props {
  HandleShowDeleteDialog: () => void;
  HandleDelete: () => void;
  show: boolean;
  name: string;
  loading: boolean;
}

function DeleteModal(props: Props) {
  const HandleCloseModal = () => {
    if (props.loading) {
      return;
    }

    props.HandleShowDeleteDialog();
  }

  return (
    <Dialog open={props.show} onClose={HandleCloseModal} >
      <Card className="delete-dialog-card">
        <CustomCardContent>
          <span>
            { `Are you sure you want to delete ` }
            <strong>
              { props.name }
            </strong>
            ?
          </span>
        </CustomCardContent>
        <Grid className="action-row" container flexDirection={"row"} alignItems="center" justifyContent="space-around">
          <Button color='secondary' variant="contained" disabled={props.loading} onClick={props.HandleDelete}>
            Delete
          </Button>
          <Button color='error' variant="outlined" disabled={props.loading} onClick={HandleCloseModal}>
            Cancel
          </Button>
        </Grid>
      </Card>
    </Dialog>
  );
}

export default DeleteModal;