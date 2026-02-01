/*import { createContext, useContext, useState } from "react";

type Role = "admin" | "user";

const RoleContext = createContext<{
  role: Role;
  toggleRole: () => void;
}>({
  role: "user",
  toggleRole: () => {},
});

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>("user");

  const toggleRole = () => {
    setRole((prev) => (prev === "user" ? "admin" : "user"));
  };

  return (
    <RoleContext.Provider value={{ role, toggleRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}*/
import { createContext, useContext, useState } from "react";

export type Role = "admin" | "user";

type RoleContextType = {
  role: Role;
  toggleRole: () => void;
  logout: () => void;
};

const RoleContext = createContext<RoleContextType>({
  role: "user",
  toggleRole: () => {},
  logout: () => {},
});

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>("user");

  const toggleRole = () => {
    setRole((prev) => (prev === "user" ? "admin" : "user"));
  };

  const logout = () => {
    // reset role (later: clear tokens/session)
    setRole("user");
  };

  return (
    <RoleContext.Provider value={{ role, toggleRole, logout }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}


