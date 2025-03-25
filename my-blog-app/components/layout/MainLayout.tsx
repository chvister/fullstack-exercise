import { useCallback, useState } from "react";
import LoginDialog from "../dialogs/Login";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "./Navbar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, login, logout } = useAuth();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const toggleLoginDialog = useCallback(() => {
    setIsLoginDialogOpen((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <Navbar
          isAuthenticated={isAuthenticated}
          logout={logout}
          toggleLoginDialog={toggleLoginDialog}
        />
      </header>

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">{children}</div>
        <LoginDialog
          login={login}
          isOpen={isLoginDialogOpen}
          onClose={toggleLoginDialog}
        />
      </main>

      <footer className="bg-gray-100 mt-auto py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © {new Date().getFullYear()} MS. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
