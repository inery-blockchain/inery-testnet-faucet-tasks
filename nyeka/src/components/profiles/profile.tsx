import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import process from "process";

const Profile = () => {
  const [profile, setProfile] = useState<any>();
  const url = process.env.REACT_APP_GITHUB_URL;

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await axios.get(`${process.env.REACT_APP_GITHUB_URL}`);
        setProfile(user.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [url]);

  return (
    <Box>
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 2,
          padding: "20px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "gray",
          }}
        >
          Welcome to my Dapp
        </Typography>
        <a href={profile?.html_url}>
          <Avatar
            alt="nyeka"
            src={profile?.avatar_url}
            sx={{
              width: 100,
              height: 100,
            }}
          />
        </a>
        <Typography
          variant="h5"
          sx={{
            color: "gray",
          }}
        >
          Inery simple messaging Dapp by {profile?.login}
        </Typography>
        <Typography
          sx={{
            color: "gray",
          }}
        >
          this Dapps is about sending other person a private message, and
          comunicate by using id, and the message will be encrypted by using the
          id of the receiver
        </Typography>
        <Typography
          sx={{
            color: "gray",
          }}
        >
          To read the message you only need to pass the id
        </Typography>
      </Box>
    </Box>
  );
};

export default Profile;
