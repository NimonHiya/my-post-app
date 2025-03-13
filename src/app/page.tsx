"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-100">
      {/* Header */}
      <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">MAKANAN AJIS</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-200 transition"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Register
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center px-6 py-16 max-w-3xl">
        <h2 className="text-4xl font-extrabold text-gray-800 leading-tight">
          Selamat Datang di <span className="text-blue-500">MAKANAN AJIS</span>
        </h2>
        <p className="text-gray-600 text-lg mt-4">
          Website Untuk Membeli Makanan AJIS
        </p>
        <button
          onClick={() => router.push("/register")}
          className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition"
        >
          Mulai Sekarang
        </button>
      </main>

      {/* Features Section */}
      <section className="bg-white w-full py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-800">Kenapa Memilih Kami?</h3>
          <p className="text-gray-600 mt-2">
            Berikut beberapa fitur unggulan yang kami tawarkan.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="p-6 bg-gray-50 shadow rounded-lg">
              <h4 className="text-xl font-semibold text-gray-800 mt-4">Mudah Digunakan</h4>
              <p className="text-gray-600 mt-2">Desain intuitif dan navigasi yang sederhana.</p>
            </div>
            <div className="p-6 bg-gray-50 shadow rounded-lg">
              <h4 className="text-xl font-semibold text-gray-800 mt-4">Keamanan Terjamin</h4>
              <p className="text-gray-600 mt-2">Data Anda aman dengan sistem enkripsi canggih.</p>
            </div>
            <div className="p-6 bg-gray-50 shadow rounded-lg">
              <h4 className="text-xl font-semibold text-gray-800 mt-4">Dukungan 24/7</h4>
              <p className="text-gray-600 mt-2">Tim support kami siap membantu kapan saja.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-6 text-center">
        <p className="text-gray-400">© 2024 Makanan AJIS. All rights reserved.</p>
      </footer>
    </div>
  );
}
