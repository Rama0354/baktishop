"use server";

import axios from "axios";

export const LoginGoogle = async () => {
  console.log("run");
  const res = await axios(
    "http://ec2-13-229-99-87.ap-southeast-1.compute.amazonaws.com/api/auth/google"
  );
  console.log(res.data);
  return res.data;
};
