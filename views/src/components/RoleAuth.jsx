import { Navigate } from "react-router-dom";
import useStore from "../store/useStore";

export const RoleAuthorization = ({children, allowRoles}) => {
  const dataLogin = useStore((state) => state.dataLogin);
  return allowRoles.includes(dataLogin.jabatan) ? children : <Navigate to={`/forbidden`} replace state={{ path: location.pathname }} />
}