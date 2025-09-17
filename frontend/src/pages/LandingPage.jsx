import Header from "../components/Header";
import ItemCard from "../components/ItemCard";

export default function LandingPage() {
  const items = [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 font-poppins p-5">
      <Header />
      <section className="flex flex-col md:flex-row items-center justify-between w-full mx-auto md:px-12  py-10 gap-8">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-bold text-indigo-900 mb-4">
            Buy & Sell Used Items on Campus
          </h1>
          <p className="text-indigo-700 text-lg mb-6">
            Quick, easy, and secure marketplace for students in hostels and campus.
          </p>
        </div>
        <div className="md:w-1/3">
          <img src="https://i.pinimg.com/1200x/92/6a/f0/926af09e73bd78bfb2bff130ec87a8cf.jpg" alt="Campus Marketplace" className="rounded-lg shadow-xl" />
        </div>
      </section>

      <main className="max-w-7xl mx-auto  py-5">
        <h2 className="text-3xl font-bold text-indigo-900 mb-6">Items for Sale</h2>
        {items.length === 0 ? (
          <p className="text-indigo-700 text-center">No items yet. Be the first to post!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
