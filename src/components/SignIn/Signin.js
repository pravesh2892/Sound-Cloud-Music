import React, { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { Typography, Box, TextField, Button, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../utils/userSlice";
import { AUTH_API, PROJECT_ID } from "../../utils/constant";

function Signin() {
  const { googleSignIn, facebookSignIn } = useUserAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const userAuthentication = useSelector((store) => store.authentication);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser1] = useState({
    email: "",
    password: "",
  });
  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUser1({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    if (email && password) {
      const data = await fetch(`${AUTH_API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          projectId: PROJECT_ID,
        },
        body: JSON.stringify({
          email,
          password,
          appType: "music",
        }),
      });
      if (data) {
        setUser1({
          email: "",
          password: "",
        });
        let json = await data.json();
        // console.log(json);
        if (json.status === "fail") {
          alert(json.message);
        } else {
          window.sessionStorage.setItem("jwt", json.token);
          setIsAuthenticated(false);
          dispatch(setUser({ name: json.data.name, email: json.data.email }));
          alert("Login Succesfully");
          navigate("/home");
        }
      }
    } else {
      alert("Please fill all the data");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignIn = async (event) => {
    event.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFacebookSignIn = async (event) => {
    event.preventDefault();
    try {
      await facebookSignIn();
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form method="POST">
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
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#3578e5",
              borderColor: "#3578e5",
              color: "#fff",
              ":hover": {
                backgroundColor: "#3578e5",
              },
              marginBottom: 2,
            }}
            startIcon={<FacebookIcon />}
            onClick={handleFacebookSignIn}
          >
            Continue with Facebook
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              borderColor: "#3578e5",
              color: "#3578e5",
              ":hover": {
                backgroundColor: "#f0f0f0",
              },
              marginBottom: 2,
            }}
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
          >
            Continue with Google
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#000",
              borderColor: "#000",
              color: "#fff",
              ":hover": {
                backgroundColor: "#333",
              },
              marginBottom: 2,
            }}
            startIcon={<AppleIcon />}
          >
            Continue with Apple
          </Button>
          {error && <Alert variant="danger">{error}</Alert>}
          <TextField
            placeholder="Enter your email"
            type="text"
            name="email"
            value={user.email}
            fullWidth
            onChange={getUserData}
            sx={{ marginBottom: 2 }}
          />
          <div style={{ position: "relative" }}>
            <TextField
              placeholder="Enter your Password"
              name="password"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={user.password}
              onChange={getUserData}
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
          </div>
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
            Signin
          </Button>
          <div className="p-4 box mt-3 text-center">
            <div>
              Don't have an account? <Link to="/signup">Sign Up</Link> |{" "}
              <Link to="/updatepassword">Update Password?</Link>
            </div>
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
    </form>
  );
}

export default Signin;
