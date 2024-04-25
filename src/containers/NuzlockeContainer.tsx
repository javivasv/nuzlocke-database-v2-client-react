import { useEffect, useState } from 'react';
import { useParams, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useValidateError from '../customHooks/useValidateError';
import { AppDispatch, RootState } from "../store/store";
import { fetchNuzlocke, setNuzlocke } from "../store/nuzlockes/nuzlockesSlice";
import LoadingRow from '../components/LoadingRow';

function NuzlockeContainer() {
  const { nuzlockeId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const nuzlocke = useSelector((state: RootState) => state.nuzlockes.nuzlocke)!;
  const [loading, setLoading] = useState(false);
  const validateError = useValidateError();

  useEffect(() => {
    setLoading(true);

    if (nuzlockeId) {
      dispatch(fetchNuzlocke(nuzlockeId!))
        .unwrap()
        .then(res => {
          dispatch(setNuzlocke(res.nuzlocke));
        })
        .catch(error => {
          validateError(error);
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