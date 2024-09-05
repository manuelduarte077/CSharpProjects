import axios from "axios";
import { ReqResponseUserListResponse } from "../interfaces/request.response";

export const loadUserAction = async (page: number) => {
  try {
    const { data } = await axios.get<ReqResponseUserListResponse>(
      `https://reqres.in/api/users`,
      {
        params: {
          page: page,
        },
      }
    );

    return data.data;
  } catch (error) {
    console.log(error);

    return [];
  }
};
