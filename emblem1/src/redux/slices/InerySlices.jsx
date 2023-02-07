import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";

const url = "http://143.198.159.250:8888";

const json_rpc = new JsonRpc(url);
const private_key = "5JPjPLCWkkes9eZXXAayYH1fScQBy5EajDysQazXTjBwE6kYS14";

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
      const respose = tx.processed.action_traces[0].console;
      console.log(tx);
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
    try {
      const tx = await api.transact(
        {
          actions: [
            {
              //   account,
              name: "read",
              authorization: [
                {
                  //   actor,
                  permission: "active",
                },
              ],
              data: {
                id: 8887,
                user: "emblem1",
                data: "dawdawdjbjb",
              },
            },
          ],
        },
        { broadcast: true, sign: true }
      );
      const respose = tx.processed.action_traces[0].console;
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
    });
    builder.addCase(createAction.fulfilled, (state, action) => {
      state.create = action.payload;
      state.loading = false;
    });
    builder.addCase(createAction.rejected, (state, action) => {
      state.loading = false;
      console.log(action.payload);
    });
    // read action
    builder.addCase(readAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(readAction.fulfilled, (state, action) => {
      state.read = action.payload;
      state.loading = false;
    });
    builder.addCase(readAction.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default inerySlices.reducer;
