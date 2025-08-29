import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, FileText, Filter } from "lucide-react";

export default function StatsSection({ stats }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
    >
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-blue-600 font-medium">Posts totales</span>
        </div>
        <div className="text-2xl font-bold text-blue-700">{stats.totalPosts}</div>
      </div>
      
      <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-600" />
          <span className="text-sm text-purple-600 font-medium">Autores totales</span>
        </div>
        <div className="text-2xl font-bold text-purple-700">{stats.totalUsers}</div>
      </div>
      
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <span className="text-sm text-green-600 font-medium">Filtrados</span>
        </div>
        <div className="text-2xl font-bold text-green-700">{stats.filteredPosts}</div>
      </div>
      
      <div className="bg-gradient-to-br from-orange-50 to-red-100 p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-orange-600" />
          <span className="text-sm text-orange-600 font-medium">Por Usuario</span>
        </div>
        <div className="text-2xl font-bold text-orange-700">
          {stats.postsPerUser.toFixed(1)}
        </div>
      </div>
    </motion.div>
  );
}