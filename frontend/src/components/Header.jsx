import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center py-4 px-8 sticky top-0 z-50
                       bg-white/30 backdrop-blur-3xl border-b border-white/20 shadow-lg rounded-b-2xl">
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full 
                        flex items-center justify-center text-white font-bold text-lg shadow-lg">
          R
        </div>
        <h1 className="text-2xl font-bold text-indigo-900 tracking-wide hover:text-indigo-700 transition">
          ReHome
        </h1>
      </Link>

      {/* Navigation Buttons */}
      <div className="flex items-center space-x-3">
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-indigo-900 font-medium">
              Hi, {user.name.split(" ")[0]}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
