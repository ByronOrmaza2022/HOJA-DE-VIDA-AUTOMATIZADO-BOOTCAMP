import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { PerfilProvider } from "./context/PerfilContext";
import { CVProvider} from "./context/CVContext"
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>            
      <PerfilProvider>
        <CVProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CVProvider>          
      </PerfilProvider>      
    </AuthProvider>
  </React.StrictMode>
);
