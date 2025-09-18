import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextInput from "../AddItem/TextInput";
import TextArea from "../AddItem/TextArea";

function AddItemForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    hostel: "",
    image: null,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      await axios.post("http://localhost:5050/api/items", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Item added successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to add item");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-indigo-200"
    >
      {message && (
        <p className="mb-6 text-center text-red-500 font-medium">{message}</p>
      )}

      <div className="space-y-5">
        <TextInput
          name="title"
          placeholder="Item Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <TextArea
          name="description"
          placeholder="Item Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <TextInput
          type="number"
          name="price"
          placeholder="Price (in ₹)"
          value={form.price}
          onChange={handleChange}
          required
        />

        <TextInput
          name="hostel"
          placeholder="Hostel (optional)"
          value={form.hostel}
          onChange={handleChange}
        />
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-indigo-900 font-medium">
          Product Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>

      <button
        type="submit"
        className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg transition"
      >
        Add Item
      </button>
    </form>
  );
}

export default AddItemForm;
