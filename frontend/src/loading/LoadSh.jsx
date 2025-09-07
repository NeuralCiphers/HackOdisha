export default function LoadSh({ label = "Loading..." }) {
  return (
    <div className="w-full py-12 flex flex-col items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-sm text-gray-600">{label}</p>
    </div>
  );
} 