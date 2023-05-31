"use client";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../../components/Button";
import AuthSocialButton from "../../components/AuthSocialButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  name: z.string().nonempty("Name is required"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please enter valid email address"),
  password: z.string().nonempty("Password is required"),
});

const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
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

    axios
      .post("/api/register", data)
      .then(() => {
        router.push("/login");
        toast.success("User Registered Successfully");
      })
      .catch((error) => {
        console.log(error?.response?.data);
        toast.error(`${error?.response?.data}` || "Something went wrong!");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="mt-[12%] sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow-xl rounded-lg sm:px-10">
        <h2 className="text-2xl font-bold text-center my-4">Register</h2>
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* name */}
          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <input
              disabled={loading}
              className={`${inputCS}  ${
                errors.name
                  ? "focus:ring-rose-500 border-rose-500"
                  : "ring-sky-600"
              }`}
              type="text"
              id="name"
              {...register("name")}
            />
            <p className="text-rose-500">{errors.name?.message as string}</p>
          </div>

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
              Register
            </Button>
          </div>
        </form>

        <div className="flex gap-2 justify-center text-sm mt-10 px-2 text-gray-500">
          <p>Already have an Account?</p>
          <p
            className="underline cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
