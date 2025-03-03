import React, { useState } from "react";
import { Container, Typography, Box, Link, FormControl, InputLabel, MenuItem,Select } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import colors from "../constant/colors";
import { apiUtility } from '../utils/api';
import { FooterPage } from "./FooterPage";
import { encryptData } from "../utils/encryption";
import CustomTextField from "../utils/customeTextField";
import CustomButton from "../utils/customButton";

const SignUpPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("user");

  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await apiUtility.post(`user/signup`, {
        userName,
        password,
        fullName,
        email,
        phoneNumber,
        address,
        isActive: true,
        isLocked: false,
        roleCode: [role]  // Role selection
      });

      if (response?.status) {
        enqueueSnackbar("Signup successful", { variant: "success" });
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", await encryptData(response.data));
        navigate("/userDashboard", { replace: true });
      } else {
        enqueueSnackbar(response.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong. Signup failed.", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "96vh",
          backgroundColor: colors.background,
        }}
      >
        <Container
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 5,
            boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)",
            borderRadius: 5,
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom sx={{ color: colors.primary, mb: 3 }}>
            Create an Account
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <CustomTextField label="Full Name" value={fullName} required onChange={(e) => setFullName(e.target.value)} />
            <CustomTextField label="User Name" value={userName} required onChange={(e) => setUserName(e.target.value)} />
            <CustomTextField label="Email"  type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
            <CustomTextField label="Phone Number" value={phoneNumber} required onChange={(e) => setPhoneNumber(e.target.value)} />
            <CustomTextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <CustomTextField label="Password" type="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
            {/* Role Selection */}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Select Role</InputLabel>
              <Select value={role} onChange={(e) => setRole(e.target.value)} required>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <CustomButton type="submit" disabled={isLoading}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </CustomButton>
          </form>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link href="/login" sx={{ color: colors.primary }}>
                Log in here
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>
      <FooterPage />
    </>
  );
};

export default SignUpPage;

