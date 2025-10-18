"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Nav from "@/app/components/nav";

interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Erreur de récupération des produits");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError("Impossible de charger les produits.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Chargement...</p>;

  if (error)
    return (
      <p className="text-center mt-10 text-red-600">
        Erreur : {error}
      </p>
    );

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-gray-50 pt-28 pb-16 px-4 sm:px-8 lg:px-12 xl:px-20">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Boutique
        </motion.h1>

        <div className="mx-auto max-w-[1600px] grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <motion.article
              key={p._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <div className="relative w-full h-48">
                {p.image && p.image.startsWith("http") ? (
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 text-sm">
                    Image invalide
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-1 p-5">
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                  {p.name}
                </h2>
                <p className="text-sm text-gray-600 flex-1 line-clamp-3">
                  {p.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-blue-600">{p.price} €</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors">
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </main>
    </>
  );
}
