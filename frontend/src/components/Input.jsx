export default function Input({
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = true,
  className = "",            
}) {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full p-4 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 transition ${className}`}
    />
  );
}
