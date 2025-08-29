import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, User, Hash, Calendar } from "lucide-react";

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Buscar...", 
  suggestions = [],
  users = [],
  onFilterChange,
  searchMode = "general" 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchType, setSearchType] = useState(searchMode);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchTypes = [
    { id: "general", label: "Todo", icon: Search, color: "indigo" },
    { id: "title", label: "Títulos", icon: Hash, color: "blue" },
    { id: "body", label: "Contenido", icon: Calendar, color: "green" },
    { id: "user", label: "Autor", icon: User, color: "purple" }
  ];

  const colors = {
    indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200", ring: "ring-indigo-100" },
    blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", ring: "ring-blue-100" },
    green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", ring: "ring-green-100" },
    purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", ring: "ring-purple-100" }
  };

  const currentType = searchTypes.find(t => t.id === searchType);

  const handleTypeChange = (type) => {
    setSearchType(type);
    setIsOpen(false);
    onFilterChange?.(type);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  const getPlaceholder = () => {
    return { title: "Buscar en títulos...", body: "Buscar en contenido...", user: "Buscar por autor..." }[searchType] || placeholder;
  };

  const filteredSuggestions = suggestions.filter(s => value && s.toLowerCase().includes(value.toLowerCase())).slice(0, 5);
  const userSuggestions = users.filter(u => value && searchType === "user" &&
    (u.name.toLowerCase().includes(value.toLowerCase()) || u.username.toLowerCase().includes(value.toLowerCase()))
  ).slice(0, 3);

  const showSuggestions = (filteredSuggestions.length || userSuggestions.length) && value;

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 bg-white shadow-lg transition-all duration-300 ${
          isOpen ? `${colors[currentType.color].border} ring-4 ${colors[currentType.color].ring}` : "border-gray-200 hover:border-gray-300"
        }`}
      >
        {/* tipo de selector */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium
              ${colors[currentType.color].bg} ${colors[currentType.color].text} hover:${colors[currentType.color].bg} transition-colors`}
          >
            <currentType.icon className="w-4 h-4" />
            <span>{currentType.label}</span>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden"
              >
                {searchTypes.map(type => (
                  <motion.button
                    key={type.id} whileHover={{ backgroundColor: "#f8fafc" }}
                    onClick={() => handleTypeChange(type.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                      searchType === type.id ? colors[type.color].bg : ""
                    }`}
                  >
                    <type.icon className={`w-4 h-4 text-${type.color}-500`} />
                    <span className="text-sm font-medium text-gray-700">{type.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 relative">
          <input
            ref={inputRef} type="text" value={value} onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsOpen(false)} placeholder={getPlaceholder()}
            className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400 text-base"
          />
        </div>

        {/* limpiar */}
        {value && (
          <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleClear}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </motion.button>
        )}
      </motion.div>

      {/* sugerencias */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-40 overflow-hidden"
          >
            {[...userSuggestions, ...filteredSuggestions].map((item, i) => {
              const isUser = item.username !== undefined;
              return (
                <motion.button
                  key={isUser ? item.id : i}
                  whileHover={{ backgroundColor: "#f8fafc" }}
                  onClick={() => { onChange(isUser ? item.name : item); setIsOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50"
                >
                  {isUser ? (
                    <>
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">@{item.username}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{item}</span>
                    </>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
