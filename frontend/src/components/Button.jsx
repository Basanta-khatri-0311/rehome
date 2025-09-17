export default function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={`px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 ${className}`}
    >
      {children}
    </button>
  );
}
