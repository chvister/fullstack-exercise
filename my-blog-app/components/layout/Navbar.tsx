import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

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
        <Link href="/" className="hidden md:inline-block" onClick={closeMenu}>
          Articles
        </Link>
      </div>

      <button
        className="md:hidden text-3xl focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>

      <div
        ref={menuRef}
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 absolute md:static top-16 left-0 right-0 bg-white md:bg-transparent p-4 md:p-0 z-10`}
      >
        <Link href="/" className="md:hidden" onClick={closeMenu}>
          Articles
        </Link>
        {isAuthenticated ? (
          <>
            <Link href="/admin" onClick={closeMenu}>
              My Articles
            </Link>
            <Link href="/admin/create" onClick={closeMenu}>
              Create Article
            </Link>
            <button
              onClick={() => {
                logout();
                closeMenu();
              }}
              className={`${navButtonStyles} bg-blue-500 text-white hover:bg-blue-600 w-full md:w-auto`}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              toggleLoginDialog();
              closeMenu();
            }}
            className={`${navButtonStyles} bg-blue-500 text-white hover:bg-blue-600 w-full md:w-auto`}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
