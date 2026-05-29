export const DEMO_SESSION_KEY = "clutch_demo_session";

export type DemoSession = {
  username: string;
  loggedInAt: string;
};

export function readDemoSession(): DemoSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DEMO_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DemoSession;
    if (!parsed.username) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeDemoSession(username: string): DemoSession {
  const session: DemoSession = {
    username,
    loggedInAt: new Date().toISOString(),
  };
  localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session));
  return session;
}

export function clearDemoSession(): void {
  localStorage.removeItem(DEMO_SESSION_KEY);
}
