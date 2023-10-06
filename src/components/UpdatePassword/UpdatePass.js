import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Box, TextField, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { AUTH_API, PROJECT_ID } from "../../utils/constant";

function UpdatePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    passwordCurrent: "",
    password: "",
  });
  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    try {
      const { username, email, passwordCurrent, password } = user;

      if (username && email && passwordCurrent && password) {
        const response = await fetch(`${AUTH_API}/updateMyPassword`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            projectId: PROJECT_ID,
            Authorization: `Bearer ${window.sessionStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({
            username,
            email,
            passwordCurrent,
            password,
            appType: "music",
          }),
        });

        const data = await response.json();

        if (data.status === "success") {
          // Password updated successfully
          window.sessionStorage.setItem("jwt", data.token);
          alert("Password Updated Successfully");
          navigate("/signin");
        } else {
          // Password update failed
          setError(data.message);
        }
      } else {
        setError("Please fill in all the fields");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setError("An error occurred while updating the password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form method="PATCH">
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
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          {error && <Alert variant="danger">{error}</Alert>}
          <TextField
            placeholder="Enter your Username"
            type="text"
            name="username"
            value={user.username}
            fullWidth
            onChange={getUserData}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            placeholder="Enter your email"
            type="text"
            name="email"
            value={user.email}
            fullWidth
            onChange={getUserData}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            placeholder="Enter your Current Password"
            name="passwordCurrent"
            fullWidth
            type={showPassword ? "text" : "password"}
            value={user.passwordCurrent}
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

          <TextField
            placeholder="Enter your New Password"
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
            Update Password
          </Button>
        </div>
      </Box>
    </form>
  );
}

export default UpdatePassword;
