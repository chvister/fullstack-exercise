import Link from "next/link";
import { useState } from "react";
import LoginDialog from "../dialogs/Login";
import { useAuth } from "@/hooks/useAuth";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, login, logout } = useAuth();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Blog page
          </Link>
          <div className="space-x-4">
            {isAuthenticated ? (
              <button onClick={logout} className="text-blue-600">
                Logout
              </button>
            ) : (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                onClick={() => setIsLoginDialogOpen(true)}
              >
                Login
              </button>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">{children}</div>
        <LoginDialog
          login={login}
          isOpen={isLoginDialogOpen}
          onClose={() => setIsLoginDialogOpen(false)}
        />
      </main>

      <footer className="bg-gray-100 mt-auto py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © 2025 Firmis. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
