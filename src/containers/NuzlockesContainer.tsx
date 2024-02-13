import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchNuzlockes, setNuzlockes } from '../store/nuzlockes/nuzlockesSlice';
import { CustomError } from "../interfaces/interfaces";
import LoadingRow from '../components/LoadingRow';
import Nuzlockes from '../components/Nuzlockes/Nuzlockes';

interface Props {
  ValidateError: (e: CustomError) => void;
  GoTo: (e: string) => void;
}

function NuzlockesContainer(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const nuzlockes = useSelector((state: RootState) => state.nuzlockes.nuzlockes);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (nuzlockes.length === 0) {
      setLoading(true);

      dispatch(fetchNuzlockes())
        .unwrap()
        .then(res => {
          dispatch(setNuzlockes(res.nuzlockes));
        })
        .catch(error => {
          props.ValidateError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        loading &&
        <LoadingRow />
      }
      {
        (!loading && nuzlockes) &&
        <Nuzlockes GoTo={props.GoTo} />
      }
    </>
  );
}
  
export default NuzlockesContainer;