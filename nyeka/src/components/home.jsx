import React, { useState } from "react";
import { api, actor } from "../config-inery";
import FormDialog from "./modal/DIalog";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Home = ({ setBodyres, setMessage }) => {
  const [id, setId] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CreateTransaction = async () => {
    try {
      setLoading(true);
      const tx = await api.transact(
        {
          actions: [
            {
              account: "nyeka",
              name: "create",
              authorization: [
                {
                  actor,
                  permission: "active",
                },
              ],
              data: {
                id,
                user: "nyeka",
                data,
              },
            },
          ],
        },
        { broadcast: true, sign: true }
      );

      console.log(tx, "\n");
      const respose = tx.processed.action_traces[0].console;
      console.log(respose);
      setBodyres(tx);
      setMessage(respose.slice(12));
    } catch (err) {
      setError(err);
      setMessage("Error please check your id");
      setBodyres({});
    }
    setLoading(false);
    setOpen(false);
  };
  console.log(error);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        marginTop: "50px",
      }}
    >
      {open && (
        <FormDialog
          open={open}
          close={handleClose}
          setData={setData}
          data={data}
          id={id}
          setid={setId}
          push={CreateTransaction}
          loading={loading}
          text="Send Message"
          body="To send a message, please enter the ID  and the message you want to send."
        />
      )}
      <Box
        sx={{
          display: "flex",
          gap: "10px",
        }}
      >
        <Button variant="contained" onClick={handleClickOpen}>
          Send Message
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
