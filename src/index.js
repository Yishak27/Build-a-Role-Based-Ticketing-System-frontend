import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SnackbarProvider } from "notistack";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container); // Use createRoot in React 18
root.render(
  <SnackbarProvider maxSnack={3}>
    <App />
  </SnackbarProvider>
);