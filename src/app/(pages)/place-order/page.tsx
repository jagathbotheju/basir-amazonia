import CheckoutWizard from "@/app/components/CheckoutWizard";

const PlaceOrder = () => {
  return (
    <div className="mt-10 px-10 w-full h-full">
      <CheckoutWizard activeStep={3} />
      <h1 className="my-5 text-xl font-bold">Place Order</h1>

      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="overflow-x-auto md:col-span-3"></div>
      </div>
    </div>
  );
};

export default PlaceOrder;
