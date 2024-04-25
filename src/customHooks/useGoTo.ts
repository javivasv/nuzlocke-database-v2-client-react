import { useNavigate } from "react-router-dom";

const useGoTo = () => {
  const navigate = useNavigate();

  const GoTo = (path: string) => {
    navigate(`/${path}`);
  };

  return GoTo;
};

export default useGoTo;