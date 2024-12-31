import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [quoteData, setQuoteData] = useState({ quote: "", author: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQuote = async () => {
    setLoading(true);
    setError(""); // Clear previous errors
    try {
      const { data } = await axios.get("https://api.quotable.io/random");
      setQuoteData({ quote: data.content, author: data.author });
    } catch (err) {
      setError("Failed to fetch a quote. Please try again later.");
      setQuoteData({ quote: "No quote available.", author: "Unknown" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote(); // Fetch the first quote on load
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Random Quote Generator</h1>

        {loading ? (
          <p className="italic text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <p className="italic text-lg mb-4">"{quoteData.quote}"</p>
            <h2 className="text-sm text-gray-500 mb-6">- {quoteData.author}</h2>
          </>
        )}

        <button
          onClick={fetchQuote}
          disabled={loading}
          className={`${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 py-2 rounded transition duration-200`}
        >
          {loading ? "Fetching..." : "New Quote"}
        </button>
      </div>
    </div>
  );
}

export default App;
