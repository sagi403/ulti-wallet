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
    const { data } = await axios.get("/api/users/protect", config);
    return data;
  } catch (error) {
    return false;
  }
};

export default checkUserToken;
