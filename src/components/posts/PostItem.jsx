import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, Calendar, MapPin, Building, ExternalLink } from "lucide-react";

export default function PostItem({ post, author }) {
  // para el avatar por usuario
  const getUserAvatar = (user) => {
    if (!user) return { initials: "?", gradient: "from-gray-400 to-gray-600" };
    
    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    const colors = [
      'from-blue-400 to-blue-600',
      'from-purple-400 to-purple-600', 
      'from-green-400 to-green-600',
      'from-orange-400 to-orange-600',
      'from-pink-400 to-pink-600',
      'from-indigo-400 to-indigo-600',
      'from-red-400 to-red-600',
      'from-teal-400 to-teal-600',
      'from-cyan-400 to-cyan-600',
      'from-emerald-400 to-emerald-600'
    ];
    const colorIndex = user.id % colors.length;
    return { initials, gradient: colors[colorIndex] };
  };

  const avatar = getUserAvatar(author);

  // obtener fecha
  const getPostDate = (postId) => {
    const baseDate = new Date('2024-01-01');
    const daysToAdd = postId * 2; 
    baseDate.setDate(baseDate.getDate() + daysToAdd);
    return baseDate.toLocaleDateString('es-ES', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <motion.article
      whileHover={{ y: -2, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden
                 hover:shadow-xl transition-all duration-300"
    >
      {/* informacion del post */}
      <div className="p-6 border-b border-gray-50">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatar.gradient} 
                           flex items-center justify-center text-white font-bold shadow-md`}>
              {avatar.initials}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {author ? author.name : "Usuario Desconocido"}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>@{author ? author.username : "unknown"}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {getPostDate(post.id)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs font-medium">
              Post #{post.id}
            </span>
          </div>
        </div>

        {/* info del autor  */}
        {author && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex flex-wrap items-center gap-4 text-xs text-gray-500"
          >
            {author.company && (
              <div className="flex items-center gap-1">
                <Building className="w-3 h-3" />
                <span>{author.company.name}</span>
              </div>
            )}
            {author.address && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{author.address.city}</span>
              </div>
            )}
            {author.website && (
              <div className="flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                <span>{author.website}</span>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* contenido */}
      <div className="p-6">
        <Link 
          to={`/posts/${post.id}`}
          className="block group"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight
                         group-hover:text-indigo-600 transition-colors duration-200">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {post.body}
        </p>

        <div className="flex items-center justify-between">
          <Link to={`/posts/${post.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 
                         rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              Ver comentarios
            </motion.button>
          </Link>
          
        </div>
      </div>
    </motion.article>
  );
}