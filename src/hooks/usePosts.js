import { useEffect, useMemo, useState } from "react";
import { getPosts, getUsers } from "../api/jsonPlaceholder";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState("");
  const [searchMode, setSearchMode] = useState("general");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const [p, u] = await Promise.all([getPosts(), getUsers()]);
        if (!active) return;
        setPosts(p);
        setUsers(u);
      } catch (e) {
        setError("Error al cargar datos");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // sugerencias
  const suggestions = useMemo(() => {
    if (!posts.length) return [];
    
    const commonWords = posts
      .flatMap(post => {
        const text = searchMode === "title" ? post.title : 
                    searchMode === "body" ? post.body :
                    `${post.title} ${post.body}`;
        return text.toLowerCase()
          .replace(/[^\w\s]/g, " ")
          .split(/\s+/)
          .filter(word => word.length > 3);
      })
      .reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      }, {});

    return Object.entries(commonWords)
      .filter(([word, count]) => count >= 3)
      .sort((a, b) => b[1] - a[1])
      .map(([word]) => word)
      .slice(0, 10);
  }, [posts, searchMode]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((post) => {
      const matchUser = userId ? post.userId === Number(userId) : true;
      
      let matchQuery = true;
      if (q) {
        switch (searchMode) {
          case "title":
            matchQuery = post.title.toLowerCase().includes(q);
            break;
          case "body":
            matchQuery = post.body.toLowerCase().includes(q);
            break;
          case "user":
            const user = users.find(u => u.id === post.userId);
            matchQuery = user ? 
              user.name.toLowerCase().includes(q) || 
              user.username.toLowerCase().includes(q) : false;
            break;
          default:
            matchQuery = post.title.toLowerCase().includes(q) ||
                        post.body.toLowerCase().includes(q);
        }
      }
      
      return matchUser && matchQuery;
    });
  }, [posts, search, userId, users, searchMode]);

  // reseteo 
  useEffect(() => {
    setPage(1);
  }, [search, userId, searchMode]);

  const stats = useMemo(() => ({
    totalPosts: posts.length,
    totalUsers: users.length,
    filteredPosts: filtered.length,
    postsPerUser: posts.length / users.length || 0
  }), [posts, users, filtered]);

  return {
    posts,
    users,
    loading,
    error,
    page,
    setPage,
    search,
    setSearch,
    userId,
    setUserId,
    searchMode,
    setSearchMode,
    suggestions,
    filtered,
    stats
  };
}