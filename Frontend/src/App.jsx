import React from 'react'
import {useState, useEffect} from "react";
import './css/App.css'
import {Card} from "./Card.jsx";
import {Form} from "./Form.jsx";
import { CirclePlus} from 'lucide-react';
import axios from 'axios';

function App() {

  const [showForm, setShowForm] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      setLoading(true);
      setError(null);
      try {
        // use relative path so dev-server proxy or same-origin works
        const res = await axios.get('/api/bookmarks');
        setBookmarks(res.data || []);
      } catch (err) {
        // improved logging for diagnostics
        console.error('Failed to fetch bookmarks', err);
        if (err.response) {
          console.error('Response status:', err.response.status);
          console.error('Response body:', err.response.data);
          setError(`Failed to load bookmarks: ${err.response.status} ${JSON.stringify(err.response.data)}`);
        } else if (err.request) {
          console.error('No response received:', err.request);
          setError('Failed to load bookmarks: no response from server');
        } else {
          setError(`Failed to load bookmarks: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const handleAddCard = (newCard) => {
    // prepend the new bookmark so it appears at the top
    setBookmarks((prev) => [newCard, ...prev]);
  };

  return (
    <>
      <div className="app-container">
        <div className="header">
          <h1>Bookmarks</h1>
        </div>

        <div className="content">
          {loading && <p>Loading bookmarks...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && bookmarks.length === 0 && (
            <p>No bookmarks yet. Add one using the + button.</p>
          )}

          <div className="cards-grid">
            {bookmarks.map((bm) => (
              <Card
                key={bm.id}
                title={bm.title}
                description={bm.description}
                url={bm.url}
              />
            ))}
          </div>
        </div>

        <div className="add-button">
          <CirclePlus onClick={()=>setShowForm(true)}/>
          {showForm &&(
              <Form onAddCard={handleAddCard} onClose={()=>setShowForm(false)}/>
          )}
        </div>
      </div>
    </>

  )
}

export default App
