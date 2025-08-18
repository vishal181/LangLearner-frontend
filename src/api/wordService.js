// src/api/wordService.js
const API_URL = "http://localhost:8080/api/words";

export async function fetchWords() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch words");
  }
  return await response.json();
}
