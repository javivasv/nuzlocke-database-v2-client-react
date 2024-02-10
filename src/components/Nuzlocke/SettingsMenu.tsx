import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setSetting } from "../../store/settings/settingsSlice";
import { Grid, Card, FormControlLabel, Checkbox } from "@mui/material";
import MultiuseText from "../MultiuseText";

function SettingsMenu() {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((state: RootState) => state.settings.settings);

  const HandleSettingChange = (index: number) => {
    dispatch(setSetting(index));
  };

  return (
    <Card className="menu-card">
      <MultiuseText text="Status filters" />
      <Grid container flexDirection={"row"}>
        {
          settings.map((setting, index) => (
            <Grid key={setting.value} container item flexDirection={"column"} xs={12}>
              <FormControlLabel control={<Checkbox checked={setting.on} color="secondary" onChange={() => HandleSettingChange(index)} />} label={setting.name} />
            </Grid>
          ))
        }
      </Grid>
    </Card>
  );
}

export default SettingsMenu;
