import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PaymentOptions from "../components/PaymentOptions";

export default function BuyPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/items/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleOrder = async () => {
    if (!selectedPayment) return alert("Select a payment method!");
    try {
      const res = await axios.post(`http://localhost:5050/api/orders/${id}`, {
        paymentMethod: selectedPayment
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setOrder(res.data);
      alert("Order created! Proceed to payment.");
    } catch (err) {
      console.error(err);
      alert("Order creation failed!");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found!</p>;

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-indigo-50">
      <div className="max-w-6xl w-full bg-white rounded-xl shadow-lg flex flex-col md:flex-row gap-10 p-5">
        {/* Product Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={item.image}
            alt={item.title}
            className="rounded-xl shadow-lg max-h-80 object-contain"
          />
        </div>

        {/* Details & Payment */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
            <p className="text-gray-700 mb-2">{item.description}</p>
            <p className="font-semibold mb-4 text-indigo-800 text-2xl">Price: ₹{item.price}</p>
            {item.hostel && <p className="text-gray-500 mb-4">Hostel: {item.hostel}</p>}
          </div>

          <PaymentOptions
            amount={item.price}
            orderId={order?._id || id} // use existing order or item id temporarily
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
          />

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold mt-4"
            onClick={handleOrder}
          >
            Create Order / Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
