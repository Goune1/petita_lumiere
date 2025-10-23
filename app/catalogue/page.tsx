"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Nav from "@/components/nav";
import Footer from "@/components/footer"
import Link from "next/link"; 

interface Product {
  _id: string;
  name: string;
  description: string;
  images: string[];
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
        <div className="mx-auto max-w-[1600px] grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <Link href={`/product/${p._id}`} key={p._id} className="group">
              <motion.article
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group-hover:scale-105"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                <div className="relative w-full h-48">
                  {p.images && p.images.length > 0 ? (
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 text-sm">
                      Image non disponible
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
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </main>
      <Footer/>
    </>
  );
}