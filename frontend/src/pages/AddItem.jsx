import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

export default function AddItem() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        hostel: "",
        image: null
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
            formData.append("title", form.title);
            formData.append("description", form.description);
            formData.append("price", form.price);
            formData.append("hostel", form.hostel || "");
            if (form.image) formData.append("image", form.image);

            const res = await axios.post("http://localhost:5050/api/items", formData, {
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
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 font-poppins p-5">
            <Header />

            <main className="max-w-3xl mx-auto py-10">
                <h2 className="text-4xl font-bold text-indigo-900 mb-8 text-center">
                    Add New Item
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-indigo-200"
                >
                    {message && (
                        <p className="mb-6 text-center text-red-500 font-medium">{message}</p>
                    )}

                    <div className="space-y-5">
                        <input
                            type="text"
                            name="title"
                            placeholder="Item Title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            required
                        />

                        <textarea
                            name="description"
                            placeholder="Item Description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none h-32"
                            required
                        />

                        <input
                            type="number"
                            name="price"
                            placeholder="Price (in ₹)"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            required
                        />

                        <input
                            type="text"
                            name="hostel"
                            placeholder="Hostel (optional)"
                            value={form.hostel}
                            onChange={handleChange}
                            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-indigo-900 font-medium">Product Image</label>
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
            </main>
        </div>
    );
}
