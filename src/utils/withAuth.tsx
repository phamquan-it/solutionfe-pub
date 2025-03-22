import { useEffect, FC } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "@/libs/redux/store";

const withAuth = <P extends object>(WrappedComponent: FC<P>) => {
  const AuthComponent: FC<P> = (props) => {
    const router = useRouter();
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
      if (!token) {
        router.push("/login"); // Redirect to login if not authenticated
      }
    }, [token, router]);

    return token ? <WrappedComponent {...props} /> : null;
  };

  // Fix: Add display name for better debugging
  AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return AuthComponent;
};

export default withAuth;

