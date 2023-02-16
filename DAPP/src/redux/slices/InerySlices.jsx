import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import { toast } from "react-toastify";

const url = "https://tas.blockchain-servers.world/";

const json_rpc = new JsonRpc(url);
const private_key = `${process.env.REACT_APP_PRIVATE_KEY}`;

const signature = new JsSignatureProvider([private_key]);

const api = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

// create
export const createAction = createAsyncThunk(
  "inery/create",
  async (values, { rejectWithValue, getState, dispatch }) => {
    const { id, user, data } = values;
    try {
      const tx = await api.transact(
        {
          actions: [
            {
              account: values.account,
              name: "create",
              authorization: [
                {
                  actor: values.actor,
                  permission: "active",
                },
              ],
              data: {
                id,
                user,
                data,
              },
            },
          ],
        },
        { broadcast: true, sign: true }
      );
      const respose = {
        tx: tx,
        message: tx.processed.action_traces[0].console,
      };
      return respose;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// read
export const readAction = createAsyncThunk(
  "inery/read",
  async (values, { rejectWithValue, getState, dispatch }) => {
    const { id } = values;
    try {
      const tx = await api.transact(
        {
          actions: [
            {
              account: values.account,
              name: "read",
              authorization: [
                {
                  actor: values.actor,
                  permission: "active",
                },
              ],
              data: {
                id,
              },
            },
          ],
        },
        { broadcast: true, sign: true }
      );
      const respose = {
        tx: tx,
        message: tx.processed.action_traces[0].console,
      };
      return respose;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const inerySlices = createSlice({
  name: "inery",
  initialState: {},
  extraReducers: (builder) => {
    // create action
    builder.addCase(createAction.pending, (state, action) => {
      state.loading = true;
      console.log(action.payload);
    });
    builder.addCase(createAction.fulfilled, (state, action) => {
      state.create = action.payload;
      toast.success(
        `Create Successfully and message: ${action.payload.message}`
      );
      state.loading = false;
    });
    builder.addCase(createAction.rejected, (state, action) => {
      state.loading = false;
      toast.error(
        `Something wrong please change id and try again, status :${action.payload}`
      );
    });
    // read action
    builder.addCase(readAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(readAction.fulfilled, (state, action) => {
      state.read = action.payload;
      toast.success(`Read Successfully and message: ${action.payload.message}`);
      state.loading = false;
    });
    builder.addCase(readAction.rejected, (state, action) => {
      state.loading = false;
      toast.error(`ID not found and status :${action.payload}`);
    });
  },
});

export default inerySlices.reducer;
