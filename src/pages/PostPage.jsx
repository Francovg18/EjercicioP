import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostById, getCommentsByPost } from "../api/jsonPlaceholder";
import CommentList from "../components/comments/CommentList";
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const [p, c] = await Promise.all([getPostById(id), getCommentsByPost(id)]);
        if (!active) return;
        setPost(p);
        setComments(c);
      } catch (e) {
        setError("No se pudo cargar la publicación.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-6 animate-pulse">Cargando…</p>
    );
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;
  if (!post)
    return <p className="text-center text-gray-500 mt-6">No encontrado</p>;

  return (
    <section className="max-w-3xl mx-auto p-4">
      <Helmet>
        <title>{post.title} - JSONPlaceholder Blog</title>
        <meta name="description" content={post.body} />
      </Helmet>

      {/* Título general de la página */}
      <h1 className="sr-only">Detalle de la publicación</h1>

      {/* Volver */}
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver
      </Link>

      {/* Post detail */}
      <motion.article
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 bg-white rounded-xl shadow border border-gray-200"
      >
        <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800 mb-3">
          <FileText className="w-6 h-6 text-indigo-500" />
          {post.title}
        </h2>
        <p className="text-gray-700 leading-relaxed">{post.body}</p>
      </motion.article>

      {/* Comentarios */}
      <h3 className="mt-8 text-xl font-semibold text-gray-800">
        Comentarios
      </h3>
      <CommentList comments={comments} />
    </section>
  );
}
