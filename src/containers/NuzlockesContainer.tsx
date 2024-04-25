import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useValidateError from '../customHooks/useValidateError';
import { AppDispatch, RootState } from '../store/store';
import { fetchNuzlockes, setNuzlockes } from '../store/nuzlockes/nuzlockesSlice';
import LoadingRow from '../components/LoadingRow';
import Nuzlockes from '../components/Nuzlockes/Nuzlockes';

function NuzlockesContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const nuzlockes = useSelector((state: RootState) => state.nuzlockes.nuzlockes);
  const [loading, setLoading] = useState(false);
  const validateError = useValidateError();

  useEffect(() => {
    if (nuzlockes.length === 0) {
      setLoading(true);

      dispatch(fetchNuzlockes())
        .unwrap()
        .then(res => {
          dispatch(setNuzlockes(res.nuzlockes));
        })
        .catch(error => {
          validateError(error);
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
        <Nuzlockes />
      }
    </>
  );
}
  
export default NuzlockesContainer;