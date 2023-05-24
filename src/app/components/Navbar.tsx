import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between py-5 px-10 shadow-xl items-center">
      <h1 className="text-2xl font-bold">amazona</h1>

      <div className="flex font-semibold gap-4">
        <Link href="/">Cart</Link>
        <Link href="/">LogIn</Link>
      </div>
    </div>
  );
};

export default Navbar;
