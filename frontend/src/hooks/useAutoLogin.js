import axios from "axios";
import { useDispatch } from "react-redux";
import { reset, setUserInfo } from "../store/userSlice";

const useAutoLogin = () => {
  const dispatch = useDispatch();

  const autoLogin = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      if (!token) {
        return false;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get("/api/users/profile", config);

      dispatch(setUserInfo(data));
      return true;
    } catch (error) {
      dispatch(reset());
      return false;
    }
  };

  return autoLogin;
};

export default useAutoLogin;
