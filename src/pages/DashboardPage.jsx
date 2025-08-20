// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

function DashboardPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Fetch username from localStorage (set during login)
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    } else {
      navigate("/login"); // redirect if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("username"); // clear session
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-white text-white">
      
      {/* Top Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white/10 backdrop-blur-md shadow-md">
        <h2 className="text-2xl font-bold">LangLearner</h2>
        <div className="flex items-center gap-4">
          <span className="text-lg">👋 Hola, <b>{username}</b></span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow text-center px-6">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Your Spanish Journey 🌎
        </motion.h1>

        <motion.p
          className="text-lg mb-10 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Choose what you’d like to explore today — practice words, test your knowledge, or discover Spanish culture.
        </motion.p>

        {/* Dashboard Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Words */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white/20 p-6 rounded-2xl shadow-lg cursor-pointer">
            <Link to="/words">
              <h2 className="text-2xl font-semibold mb-2">📖 Words</h2>
              <p>Learn and review new Spanish vocabulary daily.</p>
            </Link>
          </motion.div>

          {/* Quiz */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white/20 p-6 rounded-2xl shadow-lg cursor-pointer">
            <Link to="/quiz">
              <h2 className="text-2xl font-semibold mb-2">📝 Quiz</h2>
              <p>Test yourself with fun Spanish quizzes.</p>
            </Link>
          </motion.div>

          {/* Songs */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white/20 p-6 rounded-2xl shadow-lg cursor-pointer">
            <Link to="/songs">
              <h2 className="text-2xl font-semibold mb-2">🎶 Songs</h2>
              <p>Learn Spanish through music and lyrics.</p>
            </Link>
          </motion.div>

          {/* Movies */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white/20 p-6 rounded-2xl shadow-lg cursor-pointer">
            <Link to="/movies">
              <h2 className="text-2xl font-semibold mb-2">🎬 Movies</h2>
              <p>Watch and explore Spanish-language films.</p>
            </Link>
          </motion.div>

          {/* Books */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white/20 p-6 rounded-2xl shadow-lg cursor-pointer">
            <Link to="/books">
              <h2 className="text-2xl font-semibold mb-2">📚 Books</h2>
              <p>Read Spanish books & improve comprehension.</p>
            </Link>
          </motion.div>

          {/* Culture */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white/20 p-6 rounded-2xl shadow-lg cursor-pointer">
            <Link to="/culture">
              <h2 className="text-2xl font-semibold mb-2">🌍 Culture</h2>
              <p>Dive into Spanish traditions, food, and history.</p>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default DashboardPage;
