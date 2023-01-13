import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";

interface IProps {
  open: boolean;
  close: any;
  setData: any;
  data?: any;
  id: string;
  setid: any;
  push: any;
  text: string;
  body: string;
  loading: boolean;
}

export default function FormDialog({
  open,
  close,
  setData,
  data,
  id,
  setid,
  push,
  text,
  body,
  loading,
}: IProps) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#1a2038",
            color: "white",
          },
          "& .MiuInputBase-root": {
            color: "white",
          },
          "& .MuiInputBase-input": {
            color: "white !important",
          },
        }}
      >
        <DialogTitle>{text}</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              color: "white",
            }}
          >
            {body}{" "}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Id"
            type="number"
            fullWidth
            variant="standard"
            sx={{
              color: "white",
            }}
            required={true}
            value={id}
            onChange={(e) => setid(e.target.value)}
          />
          {text === "Send Message" ? (
            <TextField
              margin="dense"
              id="name"
              label="Message"
              type="text"
              fullWidth
              variant="standard"
              sx={{
                color: "white",
              }}
              required={true}
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          {loading ? (
            <LoadingButton
              loading={loading}
              endIcon={<SendIcon />}
              color="secondary"
              loadingPosition="end"
              variant="contained"
            >
              <span>Send</span>
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => push()}
            >
              Send
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
