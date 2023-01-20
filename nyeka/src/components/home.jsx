import React, { useState, useEffect } from "react";
import { api, actor } from "../config-inery";
import FormDialog from "./modal/DIalog";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CryptoJS from "crypto-js";

const Home = ({ setBodyres, setMessage }) => {
  const [id, setId] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [encrypt, setEncrypt] = useState("");

  const handleClose = () => {
    setOpen(false);
  };
  const secretPass = process.env.REACT_APP_SECRET_PASS;

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const encryptData = () => {
      const datatext = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        secretPass
      ).toString();
      setEncrypt(datatext);
    };
    encryptData();
  }, [data, secretPass]);

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
                data: encrypt,
              },
            },
          ],
        },
        { broadcast: true, sign: true }
      );
      console.log(tx, "\n");
      const respose = tx.processed.action_traces[0].console;
      setBodyres(tx);
      setMessage(respose.slice(12));
    } catch (err) {
      setMessage("Error please check your id");
      setBodyres({});
    }
    setLoading(false);
    setOpen(false);
    setId("");
    setData("");
  };

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
