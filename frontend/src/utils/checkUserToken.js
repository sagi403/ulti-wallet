import axios from "axios";

const checkUserToken = async userInfo => {
  if (!userInfo || !userInfo.token) {
    return false;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  try {
    await axios.get("/api/users/protect", config);
    return true;
  } catch (error) {
    return false;
  }
};

export default checkUserToken;
