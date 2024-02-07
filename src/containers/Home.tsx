import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../store/store";
import { CustomError } from '../interfaces/interfaces';
import { fetchVideos, setVideos } from '../store/videos/videosSlice';
import { Grid } from "@mui/material";
import MainContent from "../components/Home/MainContent";
import SecondaryContent from "../components/Home/SecondaryContent";

interface Props {
  ValidateError: (e: CustomError) => void;
}

function Home(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const videos = useSelector((state: RootState) => state.videos.videos);

  useEffect(() => {
    if (videos.length > 0) {
      return;
    }

    dispatch(fetchVideos()).unwrap()
      .then(res => {
        dispatch(setVideos(res.videos.sort(() => Math.random() - 0.5)));
      })
      .catch(error => {
        props.ValidateError(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid className="h-100 w-100" container flexDirection={"row"}>
      <Grid className="main-content" container item flexDirection={"column"} xs={12} md={8}>
        <MainContent />
      </Grid>
      <Grid className="secondary-content" container item flexDirection={"column"} xs={12} md={4}>
        <SecondaryContent />
      </Grid>
    </Grid>
  );
}
  
export default Home;