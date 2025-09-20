export default function PaymentOptions({ selectedPayment, setSelectedPayment }) {
  const buttons = [
    { id: "esewa", label: "eSewa", color: "blue" },
    { id: "khalti", label: "Khalti", color: "purple" },
    { id: "cod", label: "COD", color: "green" },
  ];

  return (
    <div className="flex gap-4 mt-4">
      {buttons.map((btn) => (
        <button
          key={btn.id}
          onClick={() => setSelectedPayment(btn.id)}
          className={`
            flex-1 p-3 rounded-lg border transition
            ${selectedPayment === btn.id 
              ? `bg-${btn.color}-600 text-white border-${btn.color}-600` 
              : `bg-transparent text-gray-700 border-gray-400 hover:bg-gray-100`}
          `}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}
