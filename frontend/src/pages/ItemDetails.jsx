import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/items/${id}`);
        setItem(res.data);

        // fetch related items (same category/hostel)
        const relatedRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/items?hostel=${res.data.hostel}`
        );
        // filter out the current item from related
        setRelatedItems(relatedRes.data.filter((i) => i._id !== id));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!item) return <p className="text-center mt-10">Item not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 font-poppins p-5">
      <Header />

      <main className="max-w-5xl mx-auto py-10">
        <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-2xl shadow-xl">
          <img src={item.image} alt={item.title} className="w-full md:w-1/2 h-96 object-cover rounded-xl" />
          <div className="md:w-1/2 flex flex-col justify-between">
            <h1 className="text-4xl font-bold text-indigo-900">{item.title}</h1>
            <p className="text-gray-700 mt-4">{item.description}</p>
            <p className="text-indigo-700 font-semibold mt-4 text-2xl">₹{item.price}</p>
            {item.hostel && <p className="text-gray-500 mt-2">Hostel: {item.hostel}</p>}
          </div>
        </div>

        {relatedItems.length > 0 && (
          <section className="mt-10">
            <h2 className="text-3xl font-bold text-indigo-900 mb-6">More from this hostel</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedItems.map((i) => (
                <Link key={i._id} to={`/item/${i._id}`}>
                  <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col hover:shadow-2xl transition">
                    <img src={i.image} alt={i.title} className="h-48 w-full object-cover rounded-lg mb-4" />
                    <h3 className="text-lg font-semibold">{i.title}</h3>
                    <p className="text-indigo-700 mt-2">₹{i.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
