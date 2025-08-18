// src/components/WordList.jsx
import React, { useEffect, useState } from "react";
import { fetchWords } from "../api/wordService";

function WordList() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadWords() {
      try {
        const data = await fetchWords();
        setWords(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadWords();
  }, []);

  if (loading) return <p>Loading words...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>📚 Word List</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>spanish</th>
            <th>english</th>
            <th>category</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <tr key={word.id}>
              <td>{word.id}</td>
              <td>{word.spanish}</td>
              <td>{word.english}</td>
              <td>{word.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WordList;
