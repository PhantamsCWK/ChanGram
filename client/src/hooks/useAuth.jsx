import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';

const useAuth = () => {
  const accesstoken = useSelector(state => state.auth.token);

  const data = jwtDecode(accesstoken)

  if (data) {
    return { id: data.id, username: data.username }
  }

  return { id: "", username: "" }
}

export default useAuth