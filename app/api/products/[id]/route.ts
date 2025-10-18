
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Product from "@/models/products";       

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB(); 
    const id = params.id;

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