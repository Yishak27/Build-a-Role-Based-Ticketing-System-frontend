import { ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import Login from "./Components/Auth/Login";
import SignUpPage from "./Components/Auth/SignUpPage.js";
import ProtectedRoute from "./Components/utils/ProtectedRoute";
import { UserDashboardPage } from "./Components/main/User/UserDashboardPage";
import { AdminDashboardPage } from './Components/main/Admin/AdminDashboardPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';

function App() {
  const theme = createTheme();
  // if (process.env.NODE_ENV === "development") {
  //   window.onerror = () => true;
  //   window.onunhandledrejection = (event) => {
  //     event.preventDefault();
  //   };

  //   console.error = (message) => {
  //     if (typeof message === "string" && message.includes("specific error")) {

  //     } else {
  //       console.log(message); // Log normally
  //     }
  //   };
  // }
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sinup" element = {<SignUpPage/>}></Route>
            <Route path="/userDashbard" element={<ProtectedRoute>
              <UserDashboardPage />
            </ProtectedRoute>} />
            <Route path="/AdminDashbard" 
            element={<ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>} />
            <Route
              path="/*"
              element={<Login />}
            />
          </Routes>
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  );
}

export default App;
