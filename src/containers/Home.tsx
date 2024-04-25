import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useValidateError from '../customHooks/useValidateError';
import { AppDispatch, RootState } from "../store/store";
import { fetchVideos, setVideos } from '../store/videos/videosSlice';
import { Grid } from "@mui/material";
import MainContent from "../components/Home/MainContent";
import SecondaryContent from "../components/Home/SecondaryContent";

interface Props {
  isMdAndUp: boolean;
}

function Home(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const videos = useSelector((state: RootState) => state.videos.videos);
  const validateError = useValidateError();

  useEffect(() => {
    if (videos.length > 0) {
      return;
    }

    dispatch(fetchVideos())
      .unwrap()
      .then(res => {
        dispatch(setVideos(res.videos.sort(() => Math.random() - 0.5)));
      })
      .catch(error => {
        validateError(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid className="h-100 w-100" container flexDirection={"row"}>
      {
        props.isMdAndUp &&
        <>
          <Grid className="main-content" container item flexDirection={"column"} xs={8}>
            <MainContent />
          </Grid>
          <Grid className="secondary-content" container item flexDirection={"column"} xs={4}>
            <SecondaryContent isMdAndUp={props.isMdAndUp} />
          </Grid>
        </>
      }
      {
        !props.isMdAndUp &&
        <Grid className="only-content" container item flexDirection={"column"} xs={12}>
          <MainContent />
          <SecondaryContent isMdAndUp={props.isMdAndUp} />
        </Grid>
      }
    </Grid>
  );
}
  
export default Home;