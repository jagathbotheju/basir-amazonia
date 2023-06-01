"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/Button";
import AuthSocialButton from "../../components/AuthSocialButton";

const inputCS = `form-input 
block
w-full
rounded-md
border-0
text-gray-900
shadow-sm
ring-1
ring-inset
ring-gray-300
placeholder:text-gray-400
focus:ring-2
focus:ring-inset
sm:text-sm
sm:leading-6
disabled:opacity-50 cursor-default
`;

const schema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please enter valid email address"),
  password: z.string().nonempty("Password is required"),
});

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("callbackUrl") ?? "/";
  console.log(`callback url ${searchParams.get("callbackUrl")}`);

  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "all",
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok && !callback?.error) {
          toast.success(`You are Logged In`);
          router.push(redirectUrl);
        }
        if (callback?.error) {
          toast.error(callback.error);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Internal Server Error");
      })
      .finally(() => setLoading(false));
  };

  const socialAction = (action: string) => {
    setLoading(true);
    //NextAuth social login
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.ok && !callback?.error) {
          toast.success("You are Logged In");
        }
        if (callback?.error) {
          toast.error(callback.error);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Internal Server Error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="mt-[12%] sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow-xl rounded-lg sm:px-10">
        <h2 className="text-2xl font-bold text-center my-4">Login</h2>
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* email */}
          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <input
              disabled={loading}
              className={`${inputCS}  ${
                errors.email
                  ? "focus:ring-rose-500 border-rose-500"
                  : "ring-sky-600"
              }`}
              type="text"
              id="email"
              {...register("email")}
            />
            <p className="text-rose-500">{errors.email?.message as string}</p>
          </div>

          {/* password */}
          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <input
              disabled={loading}
              className={`${inputCS}  ${
                errors.password
                  ? "focus:ring-rose-500 border-rose-500"
                  : "ring-sky-600"
              }`}
              type="password"
              id="password"
              {...register("password")}
            />
            <p className="text-rose-500">
              {errors.password?.message as string}
            </p>
          </div>

          {/* submit button */}
          <div>
            <Button disabled={loading} fullWidth type="submit">
              Sign In
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>

            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <p>New to Amazona?</p>
          <p
            className="underline cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Create an Account
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
