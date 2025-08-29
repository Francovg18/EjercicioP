import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";

export default function CommentItem({ comment }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 
                 shadow-sm transition-colors"
    >
      <div className="flex items-center gap-2 mb-1">
        <User className="w-5 h-5 text-indigo-500" />
        <h4 className="font-semibold text-gray-800">
          {comment.name}
          <small className="ml-2 text-gray-500 text-sm">({comment.email})</small>
        </h4>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed">{comment.body}</p>
    </motion.div>
  );
}
