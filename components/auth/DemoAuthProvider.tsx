"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  clearDemoSession,
  readDemoSession,
  type DemoSession,
  writeDemoSession,
} from "@/lib/demo-auth";

type DemoAuthContextValue = {
  session: DemoSession | null;
  ready: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const DemoAuthContext = createContext<DemoAuthContextValue | null>(null);

export function DemoAuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<DemoSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(readDemoSession());
    setReady(true);
  }, []);

  const login = useCallback((username: string, password: string) => {
    const user = username.trim();
    const pass = password.trim();
    if (!user || !pass) return false;
    const next = writeDemoSession(user);
    setSession(next);
    return true;
  }, []);

  const logout = useCallback(() => {
    clearDemoSession();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({ session, ready, login, logout }),
    [session, ready, login, logout]
  );

  return (
    <DemoAuthContext.Provider value={value}>{children}</DemoAuthContext.Provider>
  );
}

export function useDemoAuth() {
  const ctx = useContext(DemoAuthContext);
  if (!ctx) {
    throw new Error("useDemoAuth must be used within DemoAuthProvider");
  }
  return ctx;
}
