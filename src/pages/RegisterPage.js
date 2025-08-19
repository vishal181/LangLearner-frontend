import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  // 🌍 Trivia facts
  const triviaFacts = [
    "🌎 Spanish is spoken in 21 countries!",
    "📚 Spanish is the 2nd most spoken native language in the world.",
    "🎶 Spanish has over 93,000 words officially recognized by the RAE.",
    "💬 More than 480 million people speak Spanish as their first language.",
    "🎥 The first film with spoken dialogue in Spanish was made in 1931!"
  ];
  const [currentTrivia, setCurrentTrivia] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrivia((prev) => (prev + 1) % triviaFacts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [triviaFacts.length]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, email, password }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setMessage(`❌ Error: ${err.message || "Registration failed"}`);
        return;
      }

      const data = await res.json();
      setMessage(`✅ User ${data.username} registered successfully!`);
      setShowConfetti(true);

      setTimeout(() => setShowConfetti(false), 5000);

      setFullName("");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-white text-white relative overflow-hidden">
      {/* 🎉 Confetti */}
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}

      {/* 🌍 Trivia rotating in top-right corner */}
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

      <h2 className="text-3xl font-bold mb-6">Register / Registrarse</h2>

      {message && <p className="mb-4 text-yellow-300 font-semibold">{message}</p>}

      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 bg-black/30 p-8 rounded-xl shadow-md w-80"
      >
        <input
          type="text"
          placeholder="Full Name / Nombre completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="p-2 rounded bg-white text-black"
          required
        />
        <input
          type="text"
          placeholder="Username / Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 rounded bg-white text-black"
          required
        />
        <input
          type="email"
          placeholder="Email / Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          className="bg-purple-800 hover:bg-purple-700 transition text-white font-semibold py-2 rounded"
        >
          Register / Registrarse
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
