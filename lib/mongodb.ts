import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL as string;

if (!MONGODB_URI) {
  throw new Error("⚠️ MONGODB_URI manquant dans .env.local");
}

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("✅ MongoDB connecté");
  } catch (err) {
    console.error("❌ Erreur de connexion MongoDB :", err);
  }
};
