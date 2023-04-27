import Navbar from "~/components/auth/Navbar";
import ProtectedRoute from "~/components/ProtectedRoute";
import React from "react";
import { isActiveNavAtom } from "~/atoms/activeNavAtom";
import { useAtom } from "jotai";

export default function PanelConfig() {
  const [isActiveNav, setIsActiveNav] = useAtom(isActiveNavAtom);
  return (
    <ProtectedRoute>
      <div className="flex ">
        <Navbar />
        <section className={`${isActiveNav ? "ml-[15vw]" : "ml-[4vw]"}`}>
          <main
            className={`flex min-h-screen ${
              isActiveNav ? "w-[85vw]" : "w-[96vw]"
            } `}
          >
            {component && <component />}
          </main>
        </section>
      </div>
    </ProtectedRoute>
  );
}
