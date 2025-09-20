import KhaltiCheckout from "khalti-checkout-web";
import axios from "axios";

export default function KhaltiButton({ amount, orderId }) {
  const config = {
    publicKey: "YOUR_KHALTI_PUBLIC_KEY",
    productIdentity: orderId,
    productName: "Student Marketplace Payment",
    productUrl: "http://localhost:5173",
    eventHandler: {
      onSuccess: async (payload) => {
        try {
          // Send token to backend to verify payment
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/orders/${orderId}/verify-khalti`,
            {
              token: payload.token,
              amount: amount,
            },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
          );
          alert("Payment successful!");
        } catch (err) {
          console.error(err);
          alert("Payment verification failed!");
        }
      },
      onError: (error) => {
        console.error("Khalti Payment Error", error);
        alert("Payment failed!");
      },
      onClose: () => console.log("Khalti widget closed"),
    },
    paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
  };

  const checkout = new KhaltiCheckout(config);

  const handleKhaltiPayment = () => {
    checkout.show({ amount: amount * 100 }); // Khalti expects paisa
  };

  return (
    <button
      className="flex-1 p-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
      onClick={handleKhaltiPayment}
    >
      Pay with Khalti
    </button>
  );
}
