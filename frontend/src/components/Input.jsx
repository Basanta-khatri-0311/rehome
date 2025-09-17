export default function Input({ name, value, onChange, type = "text", placeholder }) {
  return (
    <div className="relative mb-6">
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        className="peer w-full p-4 border rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
        placeholder=" "
      />
      <label className="absolute left-4 top-4 text-gray-400 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-indigo-500 peer-focus:text-sm transition-all">
        {placeholder}
      </label>
    </div>
  );
}
