export default function PaymentOptions({ amount, orderId, selectedPayment, setSelectedPayment }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        className={`flex-1 p-3 rounded-lg transition ${selectedPayment === "esewa" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        onClick={() => setSelectedPayment("esewa")}
      >
        eSewa
      </button>

      <button
        className={`flex-1 p-3 rounded-lg transition ${selectedPayment === "khalti" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        onClick={() => setSelectedPayment("khalti")}
      >
        Khalti
      </button>

      <button
        className={`flex-1 p-3 rounded-lg transition ${selectedPayment === "cod" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        onClick={() => setSelectedPayment("cod")}
      >
        Cash on Delivery
      </button>
    </div>
  );
}
