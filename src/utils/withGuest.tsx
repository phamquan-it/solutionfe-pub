import { useEffect, FC } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "@/libs/redux/store";

const withGuest = <P extends object>(WrappedComponent: FC<P>) => {
  const GuestComponent: FC<P> = (props) => {
    const router = useRouter();
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
      if (token) {
        router.push("/"); // Redirect logged-in users to homepage
      }
    }, [token, router]);

    return !token ? <WrappedComponent {...props} /> : null;
  };

  // Fix: Add display name for debugging
  GuestComponent.displayName = `withGuest(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return GuestComponent;
};

export default withGuest;

