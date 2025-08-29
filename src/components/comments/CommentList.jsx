import CommentItem from "./CommentItem";
import React from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export default function CommentList({ comments }) {
  return (
    <section className="mt-6 p-4 bg-white rounded-xl shadow border border-gray-200">
      <div className="flex items-center gap-2 mb-4 text-indigo-600 font-semibold">
        <MessageSquare className="w-5 h-5 text-indigo-500" />
        <span>Comentarios ({comments.length})</span>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="space-y-3"
      >
        {comments.map((c) => (
          <motion.div
            key={c.id}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.3 }}
          >
            <CommentItem comment={c} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
