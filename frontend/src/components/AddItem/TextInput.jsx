
export default function TextInput({ type = "text", ...props }) {
    return (
        <input
            type={type}
            {...props}
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
    );
}
