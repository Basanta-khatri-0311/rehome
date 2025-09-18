export default function Loader({ size = 16 }) {
  return (
    <div className="flex items-center justify-center py-10">
      <div
        className={`w-${size} h-${size} border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin`}
      ></div>
    </div>
  );
}
