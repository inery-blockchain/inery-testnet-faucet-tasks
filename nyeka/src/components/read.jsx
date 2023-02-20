import React, { useState } from "react";
import { api, account, actor } from "../config-inery";
import FormDialog from "./modal/DIalog";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CryptoJS from "crypto-js";

const Read = ({ setMessage, setBodyres }) => {
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const secretPass = process.env.REACT_APP_SECRET_PASS;

  const decryptData = (text) => {
    const bytes = CryptoJS.AES.decrypt(text, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return data;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (!loading) {
      setOpen(false);
    }
  };

  const readTransact = async () => {
    try {
      setLoading(true);
      const tx = await api.transact(
        {
          actions: [
            {
              account,
              name: "read",
              authorization: [
                {
                  actor,
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
      const respose = tx.processed.action_traces[0].console;
      setMessage(decryptData(respose.slice(6)));
      setBodyres(tx);
    } catch (err) {
      setMessage("Error please check your id");
      setBodyres({});
    }
    setLoading(false);
    setOpen(false);
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
          id={id}
          setid={setId}
          text="Read Message"
          body="Enter the ID of the message you want to read"
          push={readTransact}
          loading={loading}
        />
      )}
      <Box
        sx={{
          display: "flex",
          gap: "10px",
        }}
      >
        <Button variant="contained" onClick={handleClickOpen}>
          Read Message
        </Button>
      </Box>
    </Box>
  );
};

export default Read;
