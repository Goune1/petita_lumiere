// app/product/[id]/page.tsx
import Nav from "@/components/nav";
import Image from "next/image";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/products";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";

interface IProduct {
    _id: string;
    name: string;
    description: string;
    images: string[];
    price: number;
}

interface IProductDoc {
    _id: ObjectId;
    name: string;
    description: string;
    images: string[];
    price: number;
    __v?: number;
}

async function getProduct(id: string): Promise<IProduct | null> {
    if (!ObjectId.isValid(id)) {
        return null;
    }
    
    try {
        await connectDB();
        const product = await Product.findById(id).lean<IProductDoc>();
        
        if (!product) {
            return null;
        }
        
        return {
            _id: product._id.toString(),
            name: product.name,
            description: product.description,
            images: product.images,
            price: product.price,
        };

    } catch (error) {
        console.error("Erreur (getProduct):", error);
        return null;
    }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    
    const product = await getProduct(params.id);

    if (!product) {
        notFound();
    }

    return (
        <>
            <Nav />
            <main className="min-h-screen bg-gray-50 pt-28 pb-16 px-4 sm:px-8 lg:px-12 xl:px-20">
                <div className="max-w-6xl mx-auto flex flex-col gap-12 lg:grid lg:grid-cols-2">
                    
                    <div className="lg:pt-12 order-1 lg:order-none">
                        <h1 className="text-5xl font-bold text-gray-900 mb-2 tracking-tight">{product.name}</h1>
                        <span className="text-3xl font-semibold text-blue-600 mb-4 block">
                            {product.price} €
                        </span>
                        <p className="text-gray-700 leading-relaxed mb-8">
                            {product.description}
                        </p>
                        <div className="max-w-6xl mx-auto mt-8">
                            <button className=" bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-6 py-4 rounded-lg transition-colors shadow-lg">
                                Ajouter au panier
                            </button>
                        </div>  
                    </div>
                    
                    <div className="pt-0 md:pt-14 grid grid-cols-1 sm:grid-cols-2 gap-4 order-2 lg:order-none"> 
                        {product.images.length > 0 ? (
                            product.images.map((imgUrl, index) => (
                                <div 
                                    key={index} 
                                    className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md"
                                >
                                    <Image
                                        src={imgUrl}
                                        alt={`${product.name} - image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        priority={index === 0}
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="aspect-square flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 rounded-lg col-span-full">
                                Image non disponible
                            </div>
                        )}
                    </div>

                </div>
                
                
            </main>
        </>
    );
}

