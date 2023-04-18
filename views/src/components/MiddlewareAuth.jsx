import useStore from "../store/useStore";
import {useLocation, Navigate} from "react-router-dom"

export const RequiredLogin = ({ children }) => {
  const accessToken = useStore((state) => state.token);
  const isLogin = accessToken === null || accessToken === "" ? false : true;
  const location = useLocation()

  return isLogin === false ? <>
  <Navigate to={`/login`} replace state={{ path: location.pathname }} />
  </> : children;
};
