export default function Loading() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          {/* Animasi Spinner */}
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 mt-4 text-lg font-semibold">Memuat...</p>
        </div>
      </div>
    );
  }
  