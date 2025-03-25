import { AccessToken, AuthenticationService } from "@/generated-api";
import { useMutation } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { authStorage } from "@/utils/authStorage";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

export interface UserLogin {
  username: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: AccessToken | null;
  login: (credentials: UserLogin) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: Error | null;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<AccessToken | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const loginMutation = useMutation<AccessToken, Error, UserLogin>({
    mutationKey: ["login"],
    mutationFn: ({ username, password }) =>
      AuthenticationService.postLogin({ username, password }),
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (error: Error) => {
      onError(error);
    },
  });

  useEffect(() => {
    const storedToken = authStorage.get();
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  const onSuccess = (data: AccessToken) => {
    authStorage.set(data);
    setAccessToken(data);
    setError(null);
    toast.success("Login successful");
  };

  const onError = (error: Error) => {
    authStorage.clear();
    setAccessToken(null);
    setError(null);
    console.error("Login failed:", error.message);
    toast.error(`Login failed ${error.message}`);
  };

  const login = useCallback(
    async (credentials: UserLogin) => {
      try {
        await loginMutation.mutateAsync(credentials);
      } catch (error) {
        console.log("Login failed:", error);
      }
    },
    [loginMutation]
  );

  const logout = useCallback(() => {
    authStorage.clear();
    setAccessToken(null);
    setError(null);
    router.push("/");
  }, [router]);

  const value = useMemo(
    () => ({
      accessToken,
      isAuthenticated: !!accessToken,
      login,
      logout,
      isLoading: loginMutation.isPending,
      error,
    }),
    [accessToken, login, logout, loginMutation.isPending, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
