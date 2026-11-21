
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import axios from "axios";

import { api, setAuthToken } from "../services/api";

import type {
  AuthUser,
  LoginCredentials,
  LoginResponse,
} from "../types/auth.types";

interface AuthContextData {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    credentials: LoginCredentials
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<
  AuthContextData | undefined
>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken] = useState<string | null>(
    null
  );

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  async function login(
    credentials: LoginCredentials
  ): Promise<void> {
    setIsLoading(true);

    try {
      const response =
        await api.post<LoginResponse>(
          "/auth/login",
          credentials
        );

      const { token: newToken, user: newUser } =
        response.data;

      if (!newToken || !newUser) {
        throw new Error(
          "Resposta de autenticação inválida."
        );
      }

      // Configura o token imediatamente para
      // as próximas requisições.
      setAuthToken(newToken);

      setToken(newToken);
      setUser(newUser);
    } catch (error) {
      setAuthToken(null);
      setToken(null);
      setUser(null);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error(
            "Email ou senha incorretos."
          );
        }

        if (!error.response) {
          throw new Error(
            "Não foi possível conectar ao servidor."
          );
        }
      }

      throw new Error(
        "Não foi possível realizar o login."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function logout(): void {
    setAuthToken(null);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user && token),
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth deve ser utilizado dentro de AuthProvider."
    );
  }

  return context;
}
