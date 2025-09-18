import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import ItemCard from "../components/ItemCard";
import axios from "axios";

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/items/${id}`);
        setItem(res.data);

        const relatedRes = await axios.get(
          `http://localhost:5050/api/items?hostel=${res.data.hostel}&exclude=${id}`
        );
        setRelated(relatedRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) return <p className="text-center text-indigo-700 mt-10">Loading...</p>;
  if (!item) return <p className="text-center text-red-500 mt-10">Item not found!</p>;

  return (
    <div className="min-h-screen bg-indigo-50 font-poppins p-5">
      <Header />

      {/* Main Item Section */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 mt-10">
        <div className="md:w-1/2 flex justify-center">
            <img
              src={item.image}
              alt={item.title}
              className="rounded-xl shadow-lg max-h-[500px] object-contain"
            />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">{item.title}</h1>
          <p className="text-indigo-700 text-lg mb-6">{item.description}</p>
          <p className="text-indigo-800 font-semibold text-2xl mb-2">₹{item.price}</p>
          {item.hostel && <p className="text-indigo-600 mb-4">Hostel: {item.hostel}</p>}
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition shadow-lg w-48">
            Contact Seller
          </button>
        </div>
      </section>

      {/* Related Items Section */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6">Related Items</h2>
          <div className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100 p-2">
            {related.map((relItem) => (
              <Link key={relItem._id} to={`/item/${relItem._id}`} className="min-w-[220px]">
                <ItemCard item={relItem} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
