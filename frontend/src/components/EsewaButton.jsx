import axios from "axios";

export default function EsewaButton({ amount, orderId }) {
  const handleEsewaPayment = async () => {
    const merchantCode = "YOUR_MERCHANT_CODE";
    const totalAmount = amount;

    const successUrl = `http://localhost:3000/payment-success?orderId=${orderId}&amount=${totalAmount}`;
    const failureUrl = `http://localhost:3000/payment-failure`;

    const url = `https://esewa.com.np/epay/main?amt=${totalAmount}&pdc=&psc=&txAmt=0&tAmt=${totalAmount}&pid=${orderId}&scd=${merchantCode}&su=${successUrl}&fu=${failureUrl}`;

    window.location.href = url;
  };

  return (
    <button
      className="flex-1 p-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
      onClick={handleEsewaPayment}
    >
      eSewa
    </button>
  );
}
