import axios from "axios";

export default function EsewaButton({ amount, orderId }) {
  const handleEsewaPayment = () => {
    const merchantCode = "YOUR_MERCHANT_CODE"; // from eSewa account
    const totalAmount = amount;

    const successUrl = `${import.meta.env.VITE_API_URL}/api/orders/${orderId}/verify-esewa`;
    const failureUrl = "http://localhost:5173/payment-failure"; // frontend failure page

    const url = `https://esewa.com.np/epay/main?amt=${totalAmount}&pdc=&psc=&txAmt=0&tAmt=${totalAmount}&pid=${orderId}&scd=${merchantCode}&su=${successUrl}&fu=${failureUrl}`;

    // redirect to eSewa payment page
    window.location.href = url;
  };

  return (
    <button
      className="flex-1 p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      onClick={handleEsewaPayment}
    >
      Pay with eSewa
    </button>
  );
}
