import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, ChevronDown, X } from "lucide-react";

export default function UserFilter({ users, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  
  const selectedUser = users.find(u => u.id === Number(value));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserSelect = (userId) => {
    onChange(userId);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setIsOpen(false);
  };

  // avatares
  const getUserAvatar = (user) => {
    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    const colors = [
      'from-blue-400 to-blue-600',
      'from-purple-400 to-purple-600', 
      'from-green-400 to-green-600',
      'from-orange-400 to-orange-600',
      'from-pink-400 to-pink-600',
      'from-indigo-400 to-indigo-600'
    ];
    const colorIndex = user.id % colors.length;
    return { initials, gradient: colors[colorIndex] };
  };

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2"
      >
        <Users className="w-5 h-5 text-indigo-500" />

        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 
                       bg-white shadow-lg transition-all duration-300 min-w-64 ${
              isOpen 
                ? "border-indigo-400 ring-4 ring-indigo-100" 
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {selectedUser ? (
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getUserAvatar(selectedUser).gradient} 
                               flex items-center justify-center text-white text-sm font-bold`}>
                  {getUserAvatar(selectedUser).initials}
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">{selectedUser.name}</div>
                  <div className="text-xs text-gray-500">@{selectedUser.username}</div>
                </div>
              </div>
            ) : (
              <span className="text-gray-500 flex-1 text-left">Todos los usuarios</span>
            )}
            
            <div className="flex items-center gap-1">
              {selectedUser && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`} />
            </div>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl 
                          border border-gray-200 z-50 max-h-80 overflow-y-auto"
              >
                <motion.button
                  whileHover={{ backgroundColor: "#f8fafc" }}
                  onClick={() => handleUserSelect("")}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    !value ? "bg-indigo-50 border-l-4 border-indigo-400" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 
                                 flex items-center justify-center text-white text-sm font-bold">
                    ∗
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Todos los usuarios</div>
                    <div className="text-sm text-gray-500">Todas las publicaciones</div>
                  </div>
                </motion.button>

                {/* usuarios */}
                {users.map((user) => {
                  const avatar = getUserAvatar(user);
                  return (
                    <motion.button
                      key={user.id}
                      whileHover={{ backgroundColor: "#f8fafc" }}
                      onClick={() => handleUserSelect(user.id.toString())}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        value === user.id.toString() 
                          ? "bg-indigo-50 border-l-4 border-indigo-400" 
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatar.gradient} 
                                     flex items-center justify-center text-white text-sm font-bold`}>
                        {avatar.initials}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">@{user.username}</div>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

     
    </div>
  );
}