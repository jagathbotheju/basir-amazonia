"use client";
import CheckoutWizard from "@/app/components/CheckoutWizard";
import useCart from "@/store/store";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const router = useRouter();
  const { paymentMethod, addPaymentMethod } = useCart((state) => state);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectedPaymentMethod);
    if (selectedPaymentMethod) {
      addPaymentMethod(selectedPaymentMethod);
      router.push("/order");
    } else {
      toast.error("Please select a Payment Method");
    }
  };

  useEffect(() => {
    if (paymentMethod) {
      setSelectedPaymentMethod(paymentMethod);
    }
  }, [paymentMethod]);

  return (
    <div className="mt-10 px-10 w-full">
      <CheckoutWizard activeStep={1} />
      <form className="mx-auto w-2/5" onSubmit={submitHandler}>
        <h1 className="mb-4 text-2xl font-bold">Payment Method</h1>
        {["PayPal", "Stripe", "CashOnDelivery"].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />
            <label htmlFor={payment} className="p-2">
              {payment}
            </label>
          </div>
        ))}

        <div className="mb-4 flex justify-between">
          <button
            disabled={!selectedPaymentMethod}
            onClick={() => router.push("/shipping")}
            type="button"
            className="primary-button disabled:default-button"
          >
            Back
          </button>
          <button
            disabled={!selectedPaymentMethod}
            type="submit"
            className="primary-button disabled:default-button"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;
