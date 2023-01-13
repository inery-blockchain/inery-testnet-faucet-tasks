import { useState } from "react";
import axios from "axios";

const useGetuser = async () => {
  const [data, setdata] = useState<any>();
  const currentUser = process.env.REACT_APP_GITHUB_USER;
  try {
    const user = await axios.get(`https://api.github.com/users/nyeka`);
    setdata(user.data);
  } catch (error) {
    console.log(error);
  }

  return { data };
};

export default useGetuser;
