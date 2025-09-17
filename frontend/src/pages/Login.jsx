import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Toast from "../components/Toast";
import { loginUser } from "../api/auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(form);

    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setToast({ message: "Login Successful! Redirecting...", type: "success" });
      setTimeout(() => navigate("/"), 1500);
    } else {
      setToast({ message: res.message || "Login failed", type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-200 font-sans">
      {toast && <Toast message={toast.message} type={toast.type} />}
      <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-3xl overflow-hidden max-w-4xl w-full">
        <div className="md:w-1/2 p-10 flex flex-col justify-center bg-indigo-600 text-white">
          <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-indigo-100">Login to explore and buy items from fellow students.</p>
        </div>
        <form className="md:w-1/2 p-10" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-indigo-900 mb-6">Login</h2>
          <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" />
          <Input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
          <Button type="submit" className="w-full bg-indigo-600 text-white mt-4 hover:bg-indigo-700">Login</Button>
          <p className="mt-6 text-indigo-700">
            Don't have an account? <Link to="/register" className="text-green-500 font-semibold hover:underline">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
