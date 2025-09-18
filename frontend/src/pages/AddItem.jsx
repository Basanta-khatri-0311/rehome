import Header from "../components/Header";
import AddItemForm  from "../components/AddItem/AddItemForm";


export default function AddItem() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 font-poppins p-5">
      <Header />
      <main className="max-w-3xl mx-auto py-10">
        <h2 className="text-4xl font-bold text-indigo-900 mb-8 text-center">
          Add New Item
        </h2>
        <AddItemForm />
      </main>
    </div>
  );
}
