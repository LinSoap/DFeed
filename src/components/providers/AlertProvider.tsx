import React, { createContext, useState, useContext } from "react";

export interface AlertItem {
  id: string;
  message: string;
  type: "error" | "success" | "warning" | "info";
}

export interface AlertContextType {
  alerts: AlertItem[];
  addAlert: (
    message: string,
    type: "error" | "success" | "warning" | "info"
  ) => void;
  removeAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const addAlert = (
    message: string,
    type: "error" | "success" | "warning" | "info"
  ) => {
    const newAlert: AlertItem = {
      id: Date.now().toString(),
      message,
      type,
    };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };

  const removeAlert = (id: string) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
