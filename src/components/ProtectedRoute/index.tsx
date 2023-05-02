// import { withServerSideAuth } from '@clerk/nextjs/api'
import { useEffect } from "react";
import { useRouter } from "next/router";
import { type ReactNode } from "react";
import { useUser } from "@clerk/clerk-react";

interface Props {
  children: ReactNode;
}

// export const getServerSideProps = withServerSideAuth({ loadUser: true});

const ProtectedRoute = ({ children }: Props) => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      void router.push("/");
    }
  }, [isSignedIn, router]);

  return isSignedIn ? <>{children}</> : null;
};

export default ProtectedRoute;
