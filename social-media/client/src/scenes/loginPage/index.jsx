import React, { useEffect } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

// Define the LoginPage component
const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");


  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" variant="h1" color="primary">
          GOURMET
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h2" sx={{ mb: "1.5rem" }}>
          COOK, CAPTURE, CONNECT
        </Typography>
        <Form />
        
      </Box>
    </Box>
  );
};

export default LoginPage;
