import Link from "next/link";
import Image from "next/image";

const navButtonStyles =
  "px-4 py-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

interface NavbarProps {
  isAuthenticated: boolean;
  logout: () => void;
  toggleLoginDialog: () => void;
}

const Navbar = ({
  isAuthenticated,
  logout,
  toggleLoginDialog,
}: NavbarProps) => {
  return (
    <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Image
          src="/coffee.svg"
          alt="Coffee logo"
          height={50}
          width={50}
          priority
        />
        <Link href="/">Articles</Link>
      </div>
      <div className="space-x-4">
        {isAuthenticated ? (
          <>
            <Link href="/admin">My Articles</Link>
            <Link href="/admin/create">Create Article</Link>
            <button
              onClick={logout}
              className={`${navButtonStyles} bg-blue-500 text-white hover:bg-blue-600`}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={toggleLoginDialog}
            className={`${navButtonStyles} bg-blue-500 text-white hover:bg-blue-600`}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
