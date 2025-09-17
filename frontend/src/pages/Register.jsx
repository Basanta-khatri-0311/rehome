import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Toast from "../components/Toast";
import { registerUser } from "../api/auth";

export default function Register() {
  const [form, setForm] = useState({ name:"", email:"", password:"", college:"", hostel:"" });
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser(form);

    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setToast({ message: "Registration Successful! Redirecting...", type: "success" });
      setTimeout(() => navigate("/"), 1500);
    } else {
      setToast({ message: res.message || "Registration failed", type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-200 font-sans">
      {toast && <Toast message={toast.message} type={toast.type} />}
      <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-3xl overflow-hidden max-w-4xl w-full">
        <div className="md:w-1/2 p-10 flex flex-col justify-center bg-green-500 text-white">
          <h2 className="text-4xl font-bold mb-4">Join ReHome!</h2>
          <p className="text-green-100">Register now to start buying and selling on campus.</p>
        </div>
        <form className="md:w-1/2 p-10" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-indigo-900 mb-6">Register</h2>
          {["name","email","password","college","hostel"].map((field) => (
            <Input
              key={field}
              name={field}
              type={field==="password"?"password":"text"}
              value={form[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
            />
          ))}
          <Button type="submit" className="w-full bg-green-500 text-white mt-4 hover:bg-green-600">Register</Button>
          <p className="mt-6 text-indigo-700">
            Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
