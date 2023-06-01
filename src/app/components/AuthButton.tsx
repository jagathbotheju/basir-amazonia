"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import UserMenu from "./UserMenu";
import { PuffLoader } from "react-spinners";

const AuthButton = () => {
  const session = useSession();

  if (session.status === "loading") {
    return (
      <>
        <div className="bg-yellow-500">
          <PuffLoader size={10} loading={true} />
        </div>
      </>
    );
  }

  return (
    <>
      {session.status === "authenticated" ? (
        <>
          <div className="flex gap-4 ml-auto items-center">
            <p className="text-sky-600">{session.data?.user?.name}</p>

            <UserMenu />
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
