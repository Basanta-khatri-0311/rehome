export default function Toast({ message, type = "success" }) {
  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
  };
  return (
    <div className={`${colors[type]} text-white px-6 py-3 rounded shadow-lg fixed top-5 right-5 animate-slideIn`}>
      {message}
    </div>
  );
}
