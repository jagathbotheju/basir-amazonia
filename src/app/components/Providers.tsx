"use client";
import { ReactNode, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AuthProvider from "./AuthProvider";
import ToastProvider from "./ToastProvider";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    axios.get("/api/keys/paypal").then(({ data }) => {
      setClientId(data);
    });
  }, []);

  return (
    <>
      {clientId && (
        <ToastProvider>
          <AuthProvider>
            <PayPalScriptProvider
              options={{
                clientId,
                currency: "USD",
                intent: "capture",
              }}
            >
              {children}
            </PayPalScriptProvider>
          </AuthProvider>
        </ToastProvider>
      )}
    </>
  );
};

export default Providers;
