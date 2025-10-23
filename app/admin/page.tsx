"use client";

import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

// Interface pour la structure du produit
interface Product {
  _id: string;
  name: string;
  description: string;
  images: string[]; // Tableau d'URLs d'images
  price: number;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
  });
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); 
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  // 🔒 Redirection si non authentifié
  useEffect(() => {
    // Vérifie si l'utilisateur est déconnecté après le chargement
    if (status === "unauthenticated") router.push("/auth/signin");
  }, [status, router]);

  // Fonction pour charger ou recharger les produits (mémoïsée)
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Erreur de chargement");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("❌ Erreur chargement produits :", err);
    }
  }, []);

  // 🔹 Récupère les produits au montage
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-gray-600">Chargement de la session...</p>
      </main>
    );
  }

  // 🔹 Gère la sélection de plusieurs fichiers
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  // 🔹 Gère la suppression d'un produit
  const handleDelete = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;

    try {
      // 💡 Remarque : Ceci ne supprime que le produit de la base de données.
      // Les images Vercel Blob associées ne sont PAS supprimées.
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });

      if (!res.ok) {
         throw new Error("Échec de la suppression du produit.");
      }
      
      // Mettre à jour l'état local
      setProducts(products.filter((p) => p._id !== id));
      alert("Produit supprimé avec succès !");

    } catch (err) {
      console.error("❌ Erreur de suppression :", err);
      alert("Erreur lors de la suppression du produit.");
    }
  };

  // 🔹 Gère la soumission du formulaire (création produit)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      return alert("Veuillez sélectionner au moins une image.");
    }
    if (!form.name || !form.price) {
      return alert("Le nom et le prix sont requis.");
    }

    setLoading(true);
    const uploadedImageUrls: string[] = [];

    try {
      // 💡 ÉTAPE 1 : Uploader chaque fichier sur Vercel Blob
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          // L'erreur sera capturée par le catch
          throw new Error(`Échec de l'upload pour ${file.name}`);
        }
        
        const data = await uploadRes.json();
        uploadedImageUrls.push(data.imageUrl);
      }
      
      console.log("✅ Toutes les images uploadées :", uploadedImageUrls);

      // 💡 ÉTAPE 2 : Sauvegarder le produit dans MongoDB
      const productData = {
        ...form,
        price: Number(form.price),
        images: uploadedImageUrls, // Envoie le tableau d'URLs
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de l'ajout du produit à la base de données");
      }

      // 💡 ÉTAPE 3 : Réinitialiser et recharger
      setForm({ name: "", description: "", price: "" });
      setSelectedFiles([]);
      (document.getElementById('file-input') as HTMLInputElement).value = ""; // Vider le champ input file
      
      fetchProducts(); // Recharger la liste des produits
      alert("Produit ajouté avec succès !");

    } catch (err) {
      console.error("❌ Erreur lors de la création :", err);
      alert("Une erreur est survenue. Vérifiez les logs pour plus de détails.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-20 px-8">
      {/* 🔹 En-tête et Déconnexion */}
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Espace Admin - Produits</h1>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg mt-4"
        >
          Déconnexion ({session?.user?.name || "Admin"})
        </button>
      </div>

      {/* 🔹 Formulaire de Création */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 mb-12 max-w-xl mx-auto"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Ajouter un nouveau produit</h2>
        
        {/* Champs de Texte */}
        <input
          type="text"
          placeholder="Nom du produit"
          className="border p-2 w-full mb-3 rounded text-black"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full mb-3 rounded text-black"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Prix (€)"
          className="border p-2 w-full mb-3 rounded text-black"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          min="0"
          step="0.01"
          required
        />
        
        {/* Sélection d'images */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Images du produit (Sélectionnez plusieurs)
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            multiple 
          />
          {loading && <p className="text-blue-600 mt-2">Upload en cours...</p>}
          
          {/* Aperçu des images sélectionnées */}
          {selectedFiles.length > 0 && !loading && (
            <div className="mt-3 flex flex-wrap gap-3">
              {selectedFiles.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)} 
                  alt={`Aperçu ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg border"
                  // Clean up l'URL temporaire
                  onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bouton de Soumission */}
        <button
          type="submit"
          disabled={loading || selectedFiles.length === 0 || !form.name || !form.price}
          className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors ${
            loading || selectedFiles.length === 0 || !form.name || !form.price
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loading ? 'Téléchargement des images...' : 'Ajouter le produit'}
        </button>
      </form>

      {/* 🔹 Liste des produits existants */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6 max-w-xl mx-auto">Liste des produits ({products.length})</h2>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[1600px] mx-auto pb-16">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow rounded-xl p-4 flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              
              {/* Affichage de la 1ère image (avec vérification) */}
              {p.images && p.images.length > 0 && (
                <img 
                  src={p.images[0]} 
                  alt={p.name} 
                  className="w-16 h-16 object-cover rounded" 
                />
              )}

              {/* Infos produit */}
              <div>
                <h2 className="font-semibold text-black">{p.name}</h2>
                <span className="text-blue-600 font-bold text-sm">{p.price} €</span>
              </div>
            </div>
            
            {/* Bouton Supprimer */}
            <button
              onClick={() => handleDelete(p._id)}
              className="text-red-600 hover:text-800 text-sm font-medium transition-colors ml-4"
              title="Supprimer le produit"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}