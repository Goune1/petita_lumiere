// app/api/products/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/products"; // Assurez-vous que le chemin est correct

// Fonction GET : Récupère tous les produits
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products, { status: 200 });

  } catch (error) {
    console.error("Erreur MONGODB lors de la récupération des produits:", error);
    return NextResponse.json(
      { error: "Échec du serveur lors de la récupération des produits." },
      { status: 500 }
    );
  }
}

// Fonction POST : Crée un nouveau produit (avec un tableau d'images)
export async function POST(req: Request) {
  try {
    await connectDB();
    
    // Attend 'images' (tableau de chaînes de caractères/URLs)
    const { name, description, images, price } = await req.json();

    // Vérification des champs requis
    if (!name || !price || !images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: "Nom, prix et au moins une image sont requis." },
        { status: 400 } // Bad Request
      );
    }
    
    // Convertir le prix en nombre, juste pour être sûr
    const validatedPrice = Number(price);
    if (isNaN(validatedPrice) || validatedPrice <= 0) {
        return NextResponse.json(
            { error: "Le prix doit être un nombre positif valide." },
            { status: 400 }
        );
    }

    const newProduct = new Product({ 
      name, 
      description, 
      images, // Utilise le tableau d'URLs
      price: validatedPrice 
    });
    
    await newProduct.save();
    
    return NextResponse.json(newProduct, { status: 201 }); // Created

  } catch (error) {
    // Capture l'erreur spécifique de MongoDB (validation, etc.)
    console.error("Erreur MONGODB lors de la création du produit:", error);
    
    return NextResponse.json(
      { error: "Échec du serveur lors de l'ajout à la base de données.", details: (error as Error).message }, 
      { status: 500 } // Internal Server Error
    );
  }
}