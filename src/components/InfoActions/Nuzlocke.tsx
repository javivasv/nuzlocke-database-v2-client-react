import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import MultiuseText from "../MultiuseText";

interface Props {
  GoTo: (e: string) => void;
}

function Nuzlocke(props: Props) {
  const nuzlocke = useSelector((state: RootState) => state.nuzlockes.nuzlocke)!;

  return (
    <>
      <MultiuseText text={`${nuzlocke.name} - ${nuzlocke.game}`} justify="center" />
    </>
  );
}

export default Nuzlocke;