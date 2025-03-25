import { useState, useRef, useEffect } from "react";
import { UserLogin } from "@/context/AuthContext";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ username, password });
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setUsername("");
    setPassword("");
  };

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto w-full max-w-md rounded-lg p-6 bg-white shadow-xl backdrop:bg-black/50"
      onClose={handleClose}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Login</h2>
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
