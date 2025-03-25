import { useState, useEffect } from "react";
import { UserLogin } from "@/context/AuthContext";
import { useDialog } from "@/hooks/useLoginDialog";
import { useRouter } from "next/router";

interface LoginDialogProps {
  login: (credentials: UserLogin) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginDialog({
  login,
  isOpen,
  onClose,
}: LoginDialogProps) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const dialogRef = useDialog(isOpen, onClose);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) {
      setFormData({ username: "", password: "" });
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      onClose();
      router.push("/admin");
      dialogRef.current?.close();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto w-full max-w-md rounded-lg p-6 bg-white shadow-xl backdrop:bg-black/50"
      onClose={onClose}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Login</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close login dialog"
        >
          ×
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </form>
    </dialog>
  );
}
