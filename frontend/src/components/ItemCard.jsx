export default function ItemCard({ item }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
      <p className="text-gray-700 mb-2">{item.description}</p>
      <p className="font-semibold mb-2">Price: ${item.price}</p>
      <p className="text-sm text-gray-500">Hostel: {item.hostel || "N/A"}</p>
    </div>
  );
}
