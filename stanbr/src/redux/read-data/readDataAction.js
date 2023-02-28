import { readApi } from "@/service/inery/Api";
import { setReadLoading, setReadResponse } from "./readDataSlice";

export const readDataEntryAction = (paramsData, toast) => {
  return async (dispatch) => {
    try {
      dispatch(setReadLoading(true));
      const data = await readApi(paramsData);
      if (data) {
        dispatch(setReadResponse(data));
        toast.success("Read Successfully");
      }
      dispatch(setReadLoading(false));
    } catch (error) {
      dispatch(setReadLoading(false));
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
