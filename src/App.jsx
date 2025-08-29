import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PostPage from "./pages/PostPage.jsx";
import React from "react";
import NavBar from "./components/ui/NavBar.jsx";
import { HelmetProvider } from "react-helmet-async";
export default function App() {
  return (
    <HelmetProvider>
      <div className="app bg-gray-50 min-h-screen">
        <NavBar />
        <main className="max-w-4xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<PostPage />} />
          </Routes>
        </main>
      </div>
    </HelmetProvider>
  );
}
