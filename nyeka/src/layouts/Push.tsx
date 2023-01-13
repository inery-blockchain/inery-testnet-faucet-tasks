import React, { useState } from "react";
import Home from "../components/home";
import Read from "../components/read";
import { Box } from "@mui/material";
import Datareceive from "../components/data/Datareceive";

const Push = () => {
  const [message, setMessage] = useState("");
  const [bodyres, setBodyres] = useState({});
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Home setBodyres={setBodyres} setMessage={setMessage} />
        <Read setMessage={setMessage} setBodyres={setBodyres} />
      </Box>
      <Datareceive message={message} bodyres={bodyres} />
    </Box>
  );
};

export default Push;
