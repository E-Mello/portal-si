// import { withServerSideAuth } from '@clerk/nextjs/api'
import { NextPage } from "next";
import { WithAuthProp } from "@clerk/nextjs/api";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/clerk-react";

type Props = {
  children: React.ReactNode;
};

// export const getServerSideProps = withServerSideAuth({ loadUser: true});

const ProtectedRoute = ({ children }: Props) => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      void router.push("/");
    }
  }, [isSignedIn, router]);

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
