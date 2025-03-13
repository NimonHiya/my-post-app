"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

interface CustomSession {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  };
}

export default function Dashboard() {
  const { data: session, status } = useSession() as { data: CustomSession | null; status: string };
  const [posts, setPosts] = useState<{ id: string; title: string; content: string; price: number }[]>([]);
  const [form, setForm] = useState({ id: "", title: "", content: "", price: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetchPosts();
    }
  }, [status]);

  const fetchPosts = async () => {
    setLoading(true);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.price < 0) {
      alert("Harga tidak boleh negatif!");
      return;
    }

    const method = isEditing ? "PUT" : "POST";
    const res = await fetch("/api/posts", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ id: "", title: "", content: "", price: 0 });
      setIsEditing(false);
      fetchPosts();
    }
  };

  const handleEdit = (post: { id: string; title: string; content: string; price: number }) => {
    setForm(post);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus postingan ini?")) return;

    await fetch("/api/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchPosts();
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 mt-4 text-lg font-semibold">Memuat Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session || !session.user || session.user.role !== "ADMIN") {
    return <p className="text-red-500 text-center mt-4">Akses Ditolak</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔥 Navbar (Panel Admin) */}
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Panel Admin</h1>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
        >
          Logout
        </button>
      </nav>

      {/* 🔥 Form Tambah/Edit Post */}
      <div className="mt-6 max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {isEditing ? "Edit Post" : "Tambah Post"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Judul"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full border p-2 rounded mb-2"
          />
          <textarea
            placeholder="Konten"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="number"
            placeholder="Harga"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Math.max(0, Number(e.target.value)) })}
            required
            className="w-full border p-2 rounded mb-2"
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition duration-200"
          >
            {isEditing ? "Update Post" : "Tambah Post"}
          </button>
        </form>
      </div>

      {/* 🔥 Daftar Post */}
      <div className="mt-6 max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Daftar Post</h2>
        {posts.length === 0 ? (
          <p className="text-gray-600">Belum ada postingan.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                <h3 className="font-bold text-lg text-gray-800">{post.title}</h3>
                <p className="text-gray-500">{post.content}</p> {/* 🔥 Teks abu-abu terang */}
                <p className="text-blue-500 font-semibold">Rp {post.price.toLocaleString("id-ID")}</p>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition duration-200"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
