import { useEffect, useState } from 'react';
import { useParams, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchNuzlocke, setNuzlocke } from "../store/nuzlockes/nuzlockesSlice";
import { CustomError } from "../interfaces/interfaces";
import LoadingRow from '../components/LoadingRow';

interface Props {
  ValidateError: (e: CustomError) => void;
}

function NuzlockeContainer(props: Props) {
  const { nuzlockeId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const nuzlocke = useSelector((state: RootState) => state.nuzlockes.nuzlocke)!;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (nuzlockeId) {
      dispatch(fetchNuzlocke(nuzlockeId!))
        .unwrap()
        .then(res => {
          dispatch(setNuzlocke(res.nuzlocke));
        })
        .catch(error => {
          props.ValidateError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }

    return () => {
      dispatch(setNuzlocke(null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        loading &&
        <LoadingRow />
      }
      {
        (!loading && nuzlocke) &&
        <Outlet />
      }
    </>
  );
}
  
export default NuzlockeContainer;