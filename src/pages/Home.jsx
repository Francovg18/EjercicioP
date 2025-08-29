import React from "react";
import { motion } from "framer-motion";
import { Loader2, Search } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { usePosts } from "../hooks/usePosts";
import StatsSection from "../components/ui/StatsSection";
import PostItem from "../components/posts/PostItem";
import Pagination from "../components/posts/Pagination";
import SearchBar from "../components/ui/SearchBar"; 
import UserFilter from "../components/ui/UserFilter";

const PAGE_SIZE = 7;

export default function Home() {
  const { 
    posts, users, loading, error, page, setPage, search, setSearch, 
    userId, setUserId, searchMode, setSearchMode, suggestions, filtered, stats 
  } = usePosts();

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(totalPages, p + 1));

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-40 text-indigo-600"
      >
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Cargando contenido...
      </motion.div>
    );
  }
    
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-red-500 mt-6 p-4 bg-red-50 rounded-lg"
      >
        {error}
      </motion.div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto p-4">
      <Helmet>
        <title>Home - JSONPlaceholder Blog</title>
        <meta name="description" content="Lista de publicaciones y comentarios de JSONPlaceholder" />
      </Helmet>
      
      <div className="mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 
                     bg-clip-text text-transparent"
        >
          Publicaciones
        </motion.h1>
        
        <StatsSection stats={stats} />
      </div>

      {/* filtros */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col lg:flex-row lg:items-center gap-4 mb-8"
      >
        <div className="flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            suggestions={suggestions}
            users={users}
            searchMode={searchMode}
            onFilterChange={setSearchMode}
            placeholder="Buscar publicaciones, autores o contenido..."
          />
        </div>
        <div className="lg:w-64">
          <UserFilter users={users} value={userId} onChange={setUserId} />
        </div>
      </motion.div>

      {/* resultados */}
      {(search || userId) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400"
        >
          <p className="text-blue-700">
            Mostrando {filtered.length} de {posts.length} publicaciones
            {search && ` para "${search}"`}
            {userId && ` del usuario seleccionado`}
          </p>
        </motion.div>
      )}

      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No se encontraron publicaciones
          </h3>
          <p className="text-gray-500">
            Intenta ajustar los filtros de búsqueda
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="grid gap-4"
        >
          {paginated.map((post) => {
            const author = users.find(u => u.id === post.userId);
            return (
              <motion.div
                key={post.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
              >
                <PostItem post={post} author={author} />
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* la paginacion */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPrev={prev}
            onNext={next}
          />
        </motion.div>
      )}
    </section>
  );
}