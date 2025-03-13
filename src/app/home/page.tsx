"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Post {
  id: string;
  title: string;
  content: string;
  price: number;
}

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Post[]>([]); // 🔥 State untuk menyimpan produk di keranjang

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/denied");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Gagal mengambil data post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchPosts();
    }
  }, [session]);

  // ✅ Fungsi untuk menambahkan produk ke keranjang
  const addToCart = (post: Post) => {
    setCart([...cart, post]);
  };

  // ✅ Fungsi untuk menghapus produk dari keranjang
  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // ✅ Fungsi untuk memproses pembayaran
  const handleCheckout = () => {
    alert(`Anda telah membeli ${cart.length} item dengan total Rp ${cart.reduce((total, item) => total + item.price, 0).toLocaleString("id-ID")}`);
    setCart([]); // 🔥 Kosongkan keranjang setelah pembayaran
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 mt-4 text-lg font-semibold">Memuat halaman...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg max-w-4xl mx-auto">
        <h1 className="text-xl font-bold text-gray-800">Selamat datang, {session?.user?.name || "User"}!</h1>
        {session && (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-200"
          >
            Logout
          </button>
        )}
      </header>

      {/* Produk yang tersedia */}
      <div className="mt-6 max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Produk Tersedia</h2>

        {posts.length === 0 ? (
          <p className="text-gray-600">Belum ada produk.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                <h3 className="font-bold text-lg text-gray-800">{post.title}</h3>
                <p className="text-gray-500">{post.content}</p>
                <p className="text-blue-600 font-semibold">Harga: Rp {post.price.toLocaleString("id-ID")}</p>
                <button
                  onClick={() => addToCart(post)}
                  className="mt-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-200"
                >
                  Tambahkan ke Keranjang
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔥 Keranjang Belanja */}
      <div className="mt-6 max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Keranjang Belanja</h2>

        {cart.length === 0 ? (
          <p className="text-gray-600">Keranjang Anda kosong.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="p-4 border rounded-lg shadow-sm bg-gray-50 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                  <p className="text-blue-600 font-semibold">Rp {item.price.toLocaleString("id-ID")}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition duration-200"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-4 flex justify-between items-center">
            <p className="text-gray-800 font-semibold">
              Total: Rp {cart.reduce((total, item) => total + item.price, 0).toLocaleString("id-ID")}
            </p>
            <button
              onClick={handleCheckout}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-200"
            >
              Bayar Sekarang
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
