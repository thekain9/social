// Import necessary libraries and components
import { useState } from "react";
import React, { useEffect } from 'react';
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

// Define validation schemas for registration and login forms
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

// Initial values for registration and login forms
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

// Define the Form component
const Form = () => {
  // State variables
  const [pageType, setPageType] = useState("login");
  const [error, setError] = useState(null); // Added error state
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

// Register a user on form submission
  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch("http://localhost:3002/auth/register", {
      method: "POST",
      body: formData,
    });
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();
    
    if (!savedUserResponse.ok) {
      setError(savedUser.error || `${error}: An unexpected error occurred. Please try again.`);
      return;
    }

    if (savedUser) {
      setPageType("login");
    }
  };

// Handle user login on form submission
  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3002/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();

    if (loggedInResponse.status === 404) {
      setError(loggedIn.error);
      return;
    }

    if (loggedIn && loggedIn.user && loggedIn.token) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    } else {
      setError("Unexpected error occurred. Please try again.");
    }
  };

  const handleFormSubmit = (values, onSubmitProps) => {
    if (isLogin) login(values, onSubmitProps);
    if (isRegister) register(values, onSubmitProps);
  };
// Handle the OAuth login process
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const service = urlParams.get('service');
    
    if (code && service) {
      let endpoint;
      if (service === 'google') {
        endpoint = 'http://localhost:3002/auth/google-login';
      } else if (service === 'github') {
        endpoint = 'http://localhost:3002/auth/github-login';
      }

      axios.post(endpoint, { code })
        .then(response => {
          console.log(response.data); // Handle the response accordingly
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, []);

  //Login with Google
  const handleLogin = () => {
    const CLIENT_ID = "180057569407-tp2sl38ut0ppbe0ntpvf383ka7eo0itt.apps.googleusercontent.com";
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=http://localhost:3002/auth/google/callback&response_type=code&scope=openid%20profile%20email`;
};

  //Login with Github
const handleGitHubLogin = () => {
  const CLIENT_ID = "48a20a073b561030f8c7";
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=http://localhost:3002/auth/github/callback&scope=user`;
};


  return (
    <>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => ( 
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ 
                  gridColumn: "span 4",
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  }
                }}
              />
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ 
                  gridColumn: "span 4", 
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  }
                }}
              />
            </Box>

            {/* BUTTONS */}
            <Box>
  <Button
    fullWidth
    type="submit"
    style={{
      margin: "2rem 0",
      padding: "1rem",
      backgroundColor: '#A6BF49', // Button color
      color: '#F26052', // Text color
    }}
    // Add hover effects via CSS class or other methods since inline styles don't support pseudo-classes
  >
    {isLogin ? "LOGIN" : "REGISTER"}
  </Button>
  
  <Typography
    onClick={() => {
      setPageType(isLogin ? "register" : "login");
      resetForm();
    }}
    style={{
      textDecoration: "underline",
      color: 'white',
      cursor: "pointer",
      paddingBottom: '1rem',
    }}
  >
    {isLogin ? "Don't have an account? Sign Up here." : "Already have an account? Login here."}
  </Typography>
  
  <Button
    onClick={handleLogin}
    style={{
      backgroundColor: '#F2CA52', // Button color
      color: '#F26052', // Text color
      width: '48%', // Takes up almost half the space
      fontSize: '1.2rem', // Larger font size
      marginRight: '4%', // Space between the buttons
    }}
    // Add hover effects via CSS class or other methods
  >
    {isLogin ? "Login with Google" : "Register with Google"}
  </Button>

  <Button
    onClick={handleGitHubLogin}
    style={{
      backgroundColor: '#F2CA52', // Button color
      color: '#F26052', // Text color
      width: '48%', // Takes up almost half the space
      fontSize: '1.2rem', // Larger font size
    }}
    // Add hover effects via CSS class or other methods
  >
    {isLogin ? "Login with GitHub" : "Register with GitHub"}
  </Button>
</Box>
</form>
)}
</Formik>
</>
);
};

export default Form;