import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer"; // Ensure this path matches Footer.js

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-white text-white">
      <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
        <motion.h1
          className="text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to LangLearner
        </motion.h1>

        <motion.p
          className="text-lg mb-8 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Learn new words every day and grow your vocabulary!
        </motion.p>

        <div className="flex flex-wrap gap-6 justify-center">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/login"
              className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl shadow transition"
            >
              Login
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/register"
              className="px-6 py-3 bg-purple-800 text-white font-semibold rounded-xl shadow transition"
            >
              Register
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/words"
              className="px-6 py-3 bg-blue-800 text-white font-semibold rounded-xl shadow transition"
            >
              Words
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;
