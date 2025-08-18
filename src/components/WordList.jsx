import React, { useEffect, useState } from "react";

function WordList() {
  const [words, setWords] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/words")
      .then((res) => res.json())
      .then((data) => setWords(data))
      .catch((err) => console.error("Error fetching words:", err));
  }, []);

  // Filter words by Spanish, English, or ID
  const filteredWords = words.filter((word) => {
    const lowerSearch = search.toLowerCase();
    return (
      word.spanish.toLowerCase().includes(lowerSearch) ||
      word.english.toLowerCase().includes(lowerSearch) ||
      word.id.toString().includes(lowerSearch)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">
        📖 Spanish Word List
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by ID, Spanish, or English..."
          className="w-1/2 p-3 rounded-l-full border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 rounded-r-full transition">
          Search
        </button>
      </div>

      {/* Word Table */}
      {filteredWords.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-2xl shadow-md">
            <thead className="bg-purple-200 text-purple-800">
              <tr>
                <th className="text-left py-3 px-4">ID</th>
                <th className="text-left py-3 px-4">Spanish</th>
                <th className="text-left py-3 px-4">English</th>
                <th className="text-left py-3 px-4">Category</th>
              </tr>
            </thead>
            <tbody>
              {filteredWords.map((word) => (
                <tr
                  key={word.id}
                  className="border-b border-gray-200 hover:bg-purple-50"
                >
                  <td className="py-2 px-4">{word.id}</td>
                  <td className="py-2 px-4">{word.spanish}</td>
                  <td className="py-2 px-4">{word.english}</td>
                  <td className="py-2 px-4">{word.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 italic mt-6">
          No words found.
        </p>
      )}
    </div>
  );
}

export default WordList;
