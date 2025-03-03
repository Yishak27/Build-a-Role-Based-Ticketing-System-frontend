import React, { useState } from "react";
import { Container, Typography, Box, Link } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import colors from "../constant/colors";
import { Button, Checkbox, Divider, Modal } from "antd";
import { apiUtility } from '../utils/api';
import { FooterPage } from "./FooterPage";
import { encryptData } from "../utils/encryption";
import CustomTextField from "../utils/customeTextField";
import CustomButton from "../utils/customButton";
import { LoginOutlined } from "@mui/icons-material";
const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await apiUtility.post(`user/login`, {
        userName: username
        , password: password
      });

      if (response) {
        if (response.status == true) {
          enqueueSnackbar("Login successfully", { variant: "success" });
          localStorage.setItem("authToken", response.data.token[0]);
          localStorage.setItem("user", await encryptData(response.data));
          setIsLoading(false);
          const userRole = response.data.roleCode ? response.data.roleCode : "user";
          localStorage.setItem("role", await encryptData(userRole[0]))
          if (userRole[0] == "admin")
            navigate("/AdminDashbard", { replace: true });
          else
            navigate("/userDashbard", { replace: true });
        }
        else {
          enqueueSnackbar(response.message, { variant: "error" });
          setIsLoading(false);
        }
      } else {
        enqueueSnackbar("Unable to login. Please try again later.", { variant: "error" });
        setIsLoading(false);
        return;
      }
    } catch (error) {
      // console.error('login error', error);
      enqueueSnackbar("Something went wrong. Login failed.", { variant: "error" });
      setIsLoading(false);
    }
  };

  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(true);
  }

  const onClose = () => {
    setModal(false);
  }
  const sinup = () => {
    navigate("/sinup", { replace: true });
  }

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
            animation: "fadeInUp 0.5s ease",
          }}
        >
          <Box sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}>
          </Box>

          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              color: colors.primary,
              mb: 3,
              fontSize: { xs: "24px", sm: "30px", md: "16px", lg: "24px" },
            }}
          >
            Welcome to Online ticketing system.
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <CustomTextField
              label="UserName"
              value={username}
              required={true}
              onChange={(e) => setUsername(e.target.value)}
            />
            <CustomTextField
              label="Password"
              type="password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Checkbox title="Keep me logged in" sx={{
              mt: 4, fontSize: "14px",
              //  color: colors.gray,x  
              background: colors.primary
            }} checked>Keep me logged in</Checkbox>
            <CustomButton type="submit" onload={isLoading}>Login</CustomButton>
          </form>
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2">
              New for ticketing system?{" "}
              <Link href="/sinup" sx={{ color: colors.primary }}>
                create new account here
              </Link>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              mt: 3,
            }}
          >
            <Link onClick={handleModal} sx={{ textAlign: "end" }} style={{ color: colors.primary }}>
              Need help?</Link>
          </Box>
        </Container>
        {modal &&
          <Modal
            title="Need Help?"
            visible={modal}
            onCancel={onClose}
            footer={[
              <Button key="back" style={{
                borderColor: colors.primary
              }} onClick={onClose}>
                Understand
              </Button>,
            ]}>
            <Divider sx={{ mt: 2 }} />
            <p>This is the ticketing helping desk center.
            </p>
            <div>
              <p>To have login to the system, you need to have credentials.</p>
              <p>If you don't have credentials, please contact the company support team.</p>
              <p>Other information can be found in the help section of the system ....</p>
              <p>thank you for using our system.</p>
            </div>
          </Modal>}
      </Box>
      <FooterPage />
    </>
  );
};

export default Login;
