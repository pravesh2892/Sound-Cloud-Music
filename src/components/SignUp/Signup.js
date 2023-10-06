import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Typography, Box, TextField, Button, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { AUTH_API, PROJECT_ID } from "../../utils/constant";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [error] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const getUserData = (event) => {
    let name, value;
    name = event.target.name;
    value = event.target.value;

    if (name === "age") {
      // Ensure age is not negative and is a number
      const ageValue = parseInt(value);
      if (!isNaN(ageValue) && ageValue >= 0) {
        setUser({ ...user, [name]: ageValue });
      } else {
        // Show an error or handle invalid age input
        alert("Please enter valid age and it should be a number");
      }
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, password } = user;

    if (name && email && password) {
      const data = await fetch(`${AUTH_API}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          projectId: PROJECT_ID,
        },
        body: JSON.stringify({
          name,
          email,
          password,
          appType: "music",
        }),
      });
      if (data) {
        setUser({
          name: "",
          email: "",
          password: "",
        });
        let json = await data.json();
        // console.log(json);
        if (json.status === "fail") {
          alert(json.message);
        } else {
          alert("Signup Succesfully");
          navigate("/signin");
        }
      }
    } else {
      alert("Please fill all the data");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form method="POST">
      <Box
        display="flex"
        flexDirection="column"
        maxWidth={450}
        alignItems="center"
        justifyContent="center"
        margin="20px auto !important"
        padding="20px !important"
        borderRadius={5}
        boxShadow="5px 5px 10px #ccc"
        position={"relative"}
        sx={{
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <div>
          <Typography variant="h2" sx={{ marginBottom: 2 }}>
            Create your SoundCloud account
          </Typography>
          {error && <Alert variant="danger">{error}</Alert>}
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={user.name}
            onChange={getUserData}
            sx={{ marginBottom: 2 }}
          >
            Name
          </TextField>
          <TextField
            label="Email"
            type="text"
            name="email"
            value={user.email}
            fullWidth
            onChange={getUserData}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            name="password"
            fullWidth
            type={showPassword ? "text" : "password"}
            value={user.password}
            onChange={getUserData}
            sx={{ marginBottom: 2 }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={postData}
            sx={{
              backgroundColor: "#f50",
              borderColor: "#f50",
              color: "#fff",
              ":hover": {
                backgroundColor: "#f50",
              },
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            Signup
          </Button>
          <div className="p-4 box mt-3 text-center">
            Already have an account? <Link to="/signin">Sign In</Link>
          </div>

          <Typography
            variant="body2"
            className="sc-type-light"
            sx={{
              fontFamily: "Lucida Grande, Helvetica, Arial, sans-serif",
              fontSize: "12px",
              lineHeight: 1.462,
              color: "#999",
            }}
          >
            When registering, you agree that we may use your provided data for
            the registration and to send you notifications on our products and
            services. You can unsubscribe from notifications at any time in your
            settings. For additional info, please refer to our{" "}
            <Link href="https://soundcloud.com/pages/privacy" target="_blank">
              Privacy Policy
            </Link>
            .
          </Typography>
        </div>
      </Box>
    </Form>
  );
}

export default Signup;
