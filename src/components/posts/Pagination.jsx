import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center gap-4 mt-6"
    >
      <button
        onClick={onPrev}
        disabled={page <= 1}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg border 
          transition-colors ${
            page <= 1
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-indigo-600 border-indigo-300 hover:bg-indigo-50"
          }`}
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </button>

      <span className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium">
        {page} / {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={page >= totalPages}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg border 
          transition-colors ${
            page >= totalPages
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-indigo-600 border-indigo-300 hover:bg-indigo-50"
          }`}
      >
        Siguiente
        <ChevronRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
