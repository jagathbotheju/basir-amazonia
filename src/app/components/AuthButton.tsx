"use client";
import useCart from "@/store/store";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiLogIn, FiLogOut } from "react-icons/fi";

const AuthButton = () => {
  const session = useSession();
  const router = useRouter();
  const { resetCart } = useCart((state) => state);

  const handleSignOut = () => {
    signOut();
    router.push("/");
    resetCart();
  };

  if (session.status === "loading") {
    return (
      <>
        <div className="animate-spin rounded-full w-8 h-8 absolute right-3 top-3"></div>
      </>
    );
  }

  return (
    <>
      {session.status === "authenticated" ? (
        <>
          <div className="flex gap-4 ml-auto">
            <p className="text-sky-600">{session.data?.user?.name}</p>
            <button onClick={handleSignOut} className="text-red-600">
              <FiLogOut className="text-xl" />
            </button>
          </div>
        </>
      ) : (
        <>
          <button onClick={() => signIn()} className="text-green-600 ml-auto">
            <FiLogIn className="text-xl" />
          </button>
        </>
      )}
    </>
  );
};

export default AuthButton;
