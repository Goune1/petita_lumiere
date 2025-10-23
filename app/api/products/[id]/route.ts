// app/api/products/[id]/route.ts

import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/products";
import { ObjectId } from "mongodb";

// Note: Suppression de toute annotation de type explicite pour le contexte
// ({ params }: any) permet d'éviter les conflits avec le type inféré par Next.js

export async function GET(
    request: NextRequest,
    { params }: any // Laissez Next.js inférer le type
) {
    try {
        await connectDB();
        const id = params.id as string; // Assertions de type interne pour la logique

        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "ID de produit non valide." },
                { status: 400 }
            );
        }
        
        const product = await Product.findOne({ _id: id });

        if (!product) {
            return NextResponse.json(
                { message: "Produit non trouvé." },
                { status: 404 }
            );
        }

        return NextResponse.json(product.toObject(), { status: 200 });

    } catch (error) {
        console.error("Erreur de récupération du produit:", error);
        return NextResponse.json(
            { message: "Erreur lors de la récupération du produit." },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest, 
    { params }: any // Laissez Next.js inférer le type
) {
    try {
        await connectDB();
        const id = params.id as string;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return NextResponse.json(
                { message: "Produit non trouvé." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Produit supprimé avec succès." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erreur de suppression:", error);
        return NextResponse.json(
            { message: "Erreur lors de la suppression du produit." },
            { status: 500 }
        );
    }
}

