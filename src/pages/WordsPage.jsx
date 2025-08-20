// src/pages/WordsPage.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

function WordsPage() {
  const [words, setWords] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [newWord, setNewWord] = useState("");
  const [newMeaning, setNewMeaning] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // Fetch words from backend
  const fetchWords = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/words");
      const data = await res.json();
      setWords(data);
      setFilteredWords(data);
    } catch (error) {
      console.error("❌ Error fetching words:", error);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  // Filter words by search (case insensitive)
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredWords(words);
    } else {
      setFilteredWords(
        words.filter(
          (w) =>
            w.spanish.toLowerCase().includes(searchTerm.toLowerCase()) ||
            w.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
            w.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, words]);

  // Add new word
  const handleAddWord = async () => {
    if (newWord && newMeaning && newCategory) {
      try {
        const res = await fetch("http://localhost:8080/api/words", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            spanish: newWord,
            english: newMeaning,
            category: newCategory,
          }),
        });

        if (res.ok) {
          setNewWord("");
          setNewMeaning("");
          setNewCategory("");
          fetchWords(); // refresh list
        }
      } catch (error) {
        console.error("❌ Error adding word:", error);
      }
    } else {
      alert("⚠️ Please fill all fields!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-white text-white">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-3xl font-bold">📖 LangLearner - Words</h1>
      </div>

      {/* Main Content */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-8">
        {/* Left Side: Add New Word */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-white text-black p-6 rounded-2xl shadow-lg flex flex-col space-y-4 w-[80%]"
        >
          <h2 className="text-xl font-bold text-purple-700 mb-2">
            ✍️ Did you learn a new word?
          </h2>

          <input
            type="text"
            placeholder="Spanish word"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="text"
            placeholder="English meaning"
            value={newMeaning}
            onChange={(e) => setNewMeaning(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="text"
            placeholder="Category (e.g., noun, verb, phrase)"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddWord}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow hover:bg-purple-700 transition"
          >
            ➕ Add Word
          </motion.button>
        </motion.div>

        {/* Right Side: Word List + Search + Vocab Count */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-white text-black p-6 rounded-2xl shadow-lg relative"
        >
          {/* Vocabulary count */}
          <div className="absolute top-4 right-6 bg-purple-600 text-white px-4 py-1 rounded-full shadow text-sm font-semibold">
            📊 {filteredWords.length} words
          </div>

          <h2 className="text-xl font-bold text-purple-700 mb-4">
            📚 Your Word List
          </h2>

          {/* Search bar */}
          <input
            type="text"
            placeholder="🔍 Search by Spanish / English / Category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {filteredWords.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <span className="text-4xl mb-2">🤔</span>
              <p className="text-lg font-medium">No words found</p>
              <p className="text-sm">Try searching something else</p>
            </div>
          ) : (
            <ul className="space-y-2 max-h-[400px] overflow-y-auto">
              {filteredWords.map((word, idx) => (
                <li
                  key={idx}
                  className="border-b border-gray-200 py-2 grid grid-cols-3 gap-2 text-sm"
                >
                  <span className="font-medium text-gray-800">{word.spanish}</span>
                  <span className="text-gray-600">{word.english}</span>
                  <span className="italic text-gray-500">{word.category}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default WordsPage;
