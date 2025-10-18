"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminPage() {
  const { data: session, status } = useSession(); 
  const router = useRouter();
  
  const { data: products, mutate } = useSWR("/api/products", fetcher);
  const [form, setForm] = useState({ name: "", description: "", image: "", price: "" });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/auth/signin'); 
    }
  }, [status, router]);


  if (status === "loading") {
    return (
      <main className="min-h-screen bg-gray-50 pt-20 px-8 flex justify-center items-center">
        <p className="text-xl text-gray-700">Vérification de l'accès...</p>
      </main>
    );
  }
  

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    });
    setForm({ name: "", description: "", image: "", price: "" });
    mutate();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;
    
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    mutate();
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-20 px-8">
      <div className="flex flex-col gap-4 justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Espace Admin - Produits
        </h1>
        <button 
          onClick={() => signOut({ callbackUrl: '/' })} 
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Déconnexion ({session?.user?.name || "Admin"})
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 mb-10 max-w-xl"
      >
        <input
          type="text"
          placeholder="Nom du produit"
          className="border p-2 w-full mb-3 rounded text-black"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full mb-3 rounded text-black"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL de l’image"
          className="border p-2 w-full mb-3 rounded text-black"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <input
          type="number"
          placeholder="Prix (€)"
          className="border p-2 w-full mb-4 rounded text-black"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Ajouter le produit
        </button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products?.map((p: Product) => (
          <div
            key={p._id}
            className="bg-white shadow rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold text-black">{p.name}</h2>
              <p className="text-sm text-gray-600">{p.description}</p>
              <span className="text-blue-600 font-bold">{p.price} €</span>
            </div>
            <button
              onClick={() => handleDelete(p._id)}
              className="text-red-600 font-semibold hover:text-red-800"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}