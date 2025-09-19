import KhaltiCheckout from "khalti-checkout-web";
import axios from "axios";

export default function KhaltiButton({ amount, orderId }) {
  const config = {
    publicKey: "YOUR_KHALTI_PUBLIC_KEY",
    productIdentity: orderId,
    productName: "Marketplace Payment",
    productUrl: "http://localhost:3000",
    eventHandler: {
      async onSuccess(payload) {
        try {
          await axios.post(`http://localhost:5050/api/orders/${orderId}/verify-khalti`, {
            token: payload.token,
            amount: payload.amount / 100
          });
          alert("Payment successful and verified!");
        } catch {
          alert("Payment verification failed!");
        }
      },
      onError(error) {
        console.error("Khalti Payment Error", error);
        alert("Payment failed!");
      },
      onClose() {
        console.log("Khalti widget closed");
      },
    },
    paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
  };

  const checkout = new KhaltiCheckout(config);

  const handleKhaltiPayment = () => checkout.show({ amount: amount * 100 });

  return (
    <button
      className="flex-1 p-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
      onClick={handleKhaltiPayment}
    >
      Khalti
    </button>
  );
}
