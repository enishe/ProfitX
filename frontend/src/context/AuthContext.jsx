import { createContext, useCallback, useContext, useMemo, useState } from "react";

// Çelësat e ruajtjes: duhet të bien dakord me ekipin (shih shënimin në PR).
const TOKEN_KEY = "profitx_token";
const USER_KEY = "profitx_user";

const AuthContext = createContext(null);

// Kontroll bazë në ndërfaqe: formati JWT dhe skadimi.
// Nuk zëvendëson verifikimin e vërtetë nga backend-i.
function isTokenValid(token) {
  if (!token || typeof token !== "string") return false;
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));
    if (payload.exp && payload.exp * 1000 <= Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}

function clearStoredAuth() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {
    // ruajtja nuk është e disponueshme
  }
}

function loadStoredAuth() {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!isTokenValid(token)) {
      clearStoredAuth();
      return { token: null, user: null };
    }
    const user = JSON.parse(localStorage.getItem(USER_KEY) || "null");
    return { token, user };
  } catch {
    clearStoredAuth();
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(loadStoredAuth);

  // Thirret pasi API-ja e hyrjes të kthejë token të vlefshëm.
  const login = useCallback((token, user) => {
    if (!isTokenValid(token)) {
      throw new Error("Token i pavlefshëm.");
    }
    try {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user ?? null));
    } catch {
      // vazhdon me gjendjen në memorie
    }
    setAuth({ token, user: user ?? null });
  }, []);

  const logout = useCallback(() => {
    clearStoredAuth();
    setAuth({ token: null, user: null });
  }, []);

  const value = useMemo(
    () => ({
      user: auth.user,
      token: auth.token,
      isAuthenticated: Boolean(auth.token),
      login,
      logout,
    }),
    [auth, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth duhet përdorur brenda AuthProvider.");
  }
  return context;
}