import React from "react";
import { Box, Typography } from "@mui/material";

interface IProps {
  message: any;
  bodyres: any;
}

const Datareceive = ({ message, bodyres }: IProps) => {
  return (
    <Box
      sx={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
          padding: "20px",
          borderRadius: "6px",
          backgroundColor: "black",
        }}
      >
        <Typography>The message data</Typography>
        <pre
          style={{
            marginTop: "20px",
          }}
        >
          <code>{JSON.stringify(message, null, 2)}</code>
        </pre>

        <Typography
          sx={{
            marginTop: "40px",
          }}
        >
          Data Hash
        </Typography>
        <pre>
          <code>{JSON.stringify(bodyres, null, 20)}</code>
        </pre>
      </Box>
    </Box>
  );
};

export default Datareceive;
