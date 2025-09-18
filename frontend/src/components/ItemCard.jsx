import { Link } from "react-router-dom";
export default function ItemCard({ item }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
      <div className="bg-indigo-100 h-40 flex items-center justify-center">
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover rounded mb-4"
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1 text-indigo-900">{item.title}</h3>
        <p className="text-gray-700 mb-2">{item.description}</p>
        <p className="font-semibold mb-1 text-indigo-700">Price: ₹{item.price}</p>
        <p className="text-sm text-gray-500">Hostel: {item.hostel || "N/A"}</p>
        <button className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          <Link
            to={`/item/${item._id}`}
            className="mt-4 bg-indigo-600 text-white py-2 rounded-lg text-center hover:bg-indigo-700 transition"
          >
            View Details
          </Link>
        </button>
      </div>
    </div>
  );
}
