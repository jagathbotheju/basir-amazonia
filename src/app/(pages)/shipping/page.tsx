"use client";
import CheckoutWizard from "@/app/components/CheckoutWizard";
import useCart from "@/store/store";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

const ShippingPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { addShippingAddress, shippingAddress } = useCart((state) => state);

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid, isSubmitting },
    setValue,
    getValues,
    trigger,
  } = useForm({
    defaultValues: {
      fullName: shippingAddress?.fullName || "",
      address: shippingAddress?.address || "",
      city: shippingAddress?.city || "",
      postalCode: shippingAddress?.postalCode || "",
      country: shippingAddress?.country || "",
    },
    mode: "all",
  });

  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    addShippingAddress(data);
    router.push("/payment");
  };

  useEffect(() => {
    if (shippingAddress) {
      trigger();
    }
  }, [shippingAddress, trigger]);

  return (
    <div className="mt-10 px-10 w-full">
      <CheckoutWizard activeStep={0} />
      <form className="mx-auto w-2/5" onSubmit={handleSubmit(submitHandler)}>
        <h1 className="mb-4 text-2xl font-bold">Shipping Address</h1>

        {/* name */}
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            className="w-full block form-input rounded-md shadow-sm border"
            id="fullName"
            placeholder=""
            autoFocus
            {...register("fullName", {
              required: "Please enter full name",
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">
              {errors.fullName?.message as string}
            </div>
          )}
        </div>

        {/* address */}
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="w-full block form-input rounded-md shadow-sm border"
            id="address"
            autoFocus
            {...register("address", {
              required: "Please enter Address",
            })}
          />
          {errors.address && (
            <div className="text-red-500">
              {errors.address?.message as string}
            </div>
          )}
        </div>

        <div className="flex items-start gap-5 w-full mb-4">
          {/* city */}
          <div className="w-full">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="w-full block form-input rounded-md shadow-sm border"
              id="city"
              autoFocus
              {...register("city", {
                required: "Please enter City",
              })}
            />
            {errors.city && (
              <div className="text-red-500">
                {errors.city?.message as string}
              </div>
            )}
          </div>

          {/* postal code */}
          <div className="w-full">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              className="w-full block form-input rounded-md border"
              id="postalCode"
              autoFocus
              {...register("postalCode", {
                required: "Please enter Postal Code",
              })}
            />
            {errors.postalCode && (
              <div className="text-red-500">
                {errors.postalCode?.message as string}
              </div>
            )}
          </div>
        </div>

        {/* country */}
        <div className="w-full">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            className="w-full block form-input rounded-md border"
            id="country"
            autoFocus
            {...register("country", {
              required: "Please enter Country",
            })}
          />
          {errors.country && (
            <div className="text-red-500">
              {errors.country?.message as string}
            </div>
          )}
        </div>

        {/* submit button */}
        <div className="mt-4">
          <button
            disabled={!isValid}
            className="py-2 px-4 primary-button disabled:default-button"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingPage;
