import { type User, type IdTokenResult, onIdTokenChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/init";
import { useLoadingOverlay } from "./LoadingOverlay";
import { PATHS } from "../constants/paths";
import { handleFirebaseError } from "../firebase/errors";
import { toast } from "react-toastify";

interface AuthContextType {
  user: User | null;
  idTokenResult: IdTokenResult | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { showLoading, hideLoading } = useLoadingOverlay();
  const [user, setUser] = useState<User | null>(null);
  const [idTokenResult, setIdTokenResult] = useState<IdTokenResult | null>(
    null,
  );
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setIdTokenResult(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const tokenResult = await firebaseUser.getIdTokenResult();

      setUser(firebaseUser);
      setIdTokenResult(tokenResult);
      setIsAdmin(tokenResult.claims.admin === true);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signOut = async (): Promise<void> => {
    showLoading();
    try {
      await auth.signOut();
      window.location.href = PATHS.LOGIN;
    } catch (error) {
      toast.error(handleFirebaseError(error));
    } finally {
      hideLoading();
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, idTokenResult, isAdmin, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
