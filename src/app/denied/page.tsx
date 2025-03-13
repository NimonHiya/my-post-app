"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AccessDenied() {
  const router = useRouter();

  useEffect(() => {
    // Redirect ke login setelah 3 detik
    const timeout = setTimeout(() => {
      router.push("/login");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-center">
      <h1 className="text-4xl font-bold text-red-600">Akses Ditolak</h1>
      <p className="text-gray-700 mt-2 text-lg">
        Anda tidak memiliki izin untuk mengakses halaman ini.
      </p>
      <p className="text-gray-600 mt-1">Anda akan dialihkan ke halaman login...</p>

      <div className="mt-6 animate-bounce">
        <svg
          className="w-12 h-12 text-red-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 14L21 3m0 0l-9 9m9-9H3m7 11l-9 9m0 0l9-9m-9 9h18"
          ></path>
        </svg>
      </div>
    </div>
  );
}
