import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from "../features/users/usersApiSlice"

const useAuth = () => {
  const accesstoken = useSelector(state => state.auth.token)

  const decodedToken = jwtDecode(accesstoken);

  const { data } = useGetUserQuery(decodedToken.username);

  if (data) {
    return { username: data.username, picturePath: data.picturePath }
  }

  return { username: "", picturePath: "" }
}

export default useAuth