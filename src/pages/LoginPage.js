// src/pages/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const triviaFacts = [
    "📝 In Spanish, nouns have gender: masculine or feminine.",
    "🕑 Days of the week in Spanish are not capitalized.",
    "🇪🇸 The Royal Spanish Academy (RAE) was founded in 1713.",
    "📖 Don Quixote is considered the first modern novel in Spanish.",
    "🎶 The ñ (eñe) is unique to Spanish and a few other languages."
  ];
  const [currentTrivia, setCurrentTrivia] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrivia((prev) => (prev + 1) % triviaFacts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [triviaFacts.length]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setMessage(`❌ Error: ${err.message || "Invalid login credentials"}`);
        return;
      }

      const data = await res.json();
      setMessage(`✅ Welcome back, ${data.username}! 🎉`);
      setShowConfetti(true);

      localStorage.setItem("username", data.username);

      setTimeout(() => {
        setShowConfetti(false);
        navigate("/words");
      }, 2000);

      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-600 via-blue-500 to-white text-white relative overflow-hidden">
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}
      <div className="absolute top-4 right-4 w-64 text-right">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentTrivia}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="text-yellow-300 text-sm font-semibold"
          >
            {triviaFacts[currentTrivia]}
          </motion.p>
        </AnimatePresence>
      </div>

      <h2 className="text-3xl font-bold mb-6">Login / Iniciar sesión</h2>
      {message && <p className="mb-4 text-yellow-300 font-semibold">{message}</p>}

      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 bg-black/30 p-8 rounded-xl shadow-md w-80"
      >
        <input
          type="text"
          placeholder="Username / Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 rounded bg-white text-black"
          required
        />
        <input
          type="password"
          placeholder="Password / Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-white text-black"
          required
        />
        <button
          type="submit"
          className="bg-green-700 hover:bg-green-600 transition text-white font-semibold py-2 rounded"
        >
          Login / Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
