import { createApi } from "@/service/inery/Api";
import {
  setCreatedResponse,
  setCreateLoading,
  setId,
  setIsCreated,
  setMessage,
} from "./createSlice";

export const createDataEntryAction = (paramsData, toast) => {
  return async (dispatch) => {
    try {
      dispatch(setCreateLoading(true));
      const data = await createApi(paramsData);
      if (data) {
        dispatch(setCreatedResponse(data));
        dispatch(setIsCreated(true));
        toast.success("Create Successfully");
      }
      dispatch(setId(paramsData.id));
      dispatch(setMessage(paramsData.data));
      dispatch(setCreateLoading(false));
    } catch (error) {
      dispatch(setCreateLoading(false));
      console.log(error);
      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : error?.message
          ? error?.message
          : error?.toString().slice(7)
      );
    }
  };
};
