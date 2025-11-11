"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors tracking-tight"
        >
          Petita Lumière
        </Link>

        {/* Lien desktop */}
        <div className="hidden sm:flex items-center space-x-6">
          <Link
            href="/catalogue"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Catalogue
          </Link>
        </div>

        {/* Bouton burger mobile */}
        <button
          className="sm:hidden text-gray-800 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden bg-white border-t border-gray-200 shadow-inner"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              <Link
                href="/catalogue"
                className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Catalogue
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
