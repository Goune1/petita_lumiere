// app/api/upload/route.ts

import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File; 

  if (!file) {
    return NextResponse.json({ error: 'Aucun fichier reçu' }, { status: 400 });
  }

  try {
    // 💡 CORRECTION : Ajout de l'option addRandomSuffix: true
    const blob = await put(`uploads/${file.name}`, file, { 
      access: 'public', 
      addRandomSuffix: true // Ceci garantit que le nom est unique
    });

    // Renvoyer l'URL du Blob
    return NextResponse.json({ imageUrl: blob.url });
    
  } catch (error) {
    console.error("Erreur lors de l'upload Blob:", error);
    return NextResponse.json(
      { error: "Échec de l'upload sur Vercel Blob." }, 
      { status: 500 }
    );
  }
}