
export default function TextArea({ ...props }) {
  return (
    <textarea
      {...props}
      className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none h-32"
    />
  );
}
