"use client";
import { useCallback, useState } from "react";
import Avatar from "./Avatar";
import UserMenuItem from "./UserMenuItem";
import useCart from "@/store/store";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const UserMenu = () => {
  const router = useRouter();
  const { resetCart } = useCart((state) => state);
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
    //router.push("/");
    resetCart();
    toggleOpen();
  };

  return (
    <div className="relative">
      <div
        onClick={toggleOpen}
        className="p-4 md:py-1 md:px-2 flex rounded-full cursor-pointer hover:shadow-md transition"
      >
        <Avatar />
      </div>

      {/* menu items */}
      {open && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-14 text-sm z-10">
          <div className="flex flex-col cursor-pointer">
            <>
              <UserMenuItem onClick={() => {}} label="Profile" />
              <UserMenuItem onClick={() => {}} label="Order History" />
              <UserMenuItem onClick={handleSignOut} label="Logout" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
