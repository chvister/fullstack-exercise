import Link from "next/link";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Blog page
          </Link>

          <div className="space-x-4">admin / login / logout</div>
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

      <footer className="bg-gray-100 mt-auto py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © 2023 Blog Engine. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
