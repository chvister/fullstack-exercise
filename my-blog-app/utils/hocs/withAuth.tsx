import { useRouter } from "next/router";
import { JSX, useEffect, useState } from "react";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { authStorage } from "../authStorage";

export function withAuth<T extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<T>
) {
  return function ProtectedComponent(props: T) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = authStorage.get();
      const authStatus = !!token;
      setIsAuthenticated(authStatus);

      if (!authStatus) {
        router.push("/");
      }
    }, [router]);

    if (!isAuthenticated) {
      return <SkeletonLoader />;
    }

    return <Component {...props} />;
  };
}
