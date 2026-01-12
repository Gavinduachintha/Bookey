import React from 'react'
import {useState, useEffect} from "react";
import './css/App.css'
import {Card} from "./Card.jsx";
import {Form} from "./Form.jsx";
import { CirclePlus} from 'lucide-react';
import axios from 'axios';
import VideoBookmark from "./VideoBookmark.jsx";

function App() {

  const [showForm, setShowForm] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [videoBookmarks, setVideoBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      setLoading(true);
      setError(null);
      try {
        // use relative path so dev-server proxy or same-origin works
        const res = await axios.get('/api/bookmarks');
        const res2 = await axios.get('/api/video-bookmarks');
        setBookmarks(res.data || []);
        setVideoBookmarks(res2.data || []);
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

  const deleteCard = async (id) => {
    try {
      const response = await axios.delete(`/api/bookmarks/${id}`);
      if (response.status === 204 || response.status === 200) {
        setBookmarks((prev) => prev.filter((bm) => bm.id !== id));
      } else {
        console.error('Unexpected delete response:', response.status, response.data);
      }
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  }

  const updateCard = async (id, updatedData) => {
    try {
      const response = await axios.put(`/api/bookmarks/${id}`, updatedData);
      if (response.status === 200) {
        setBookmarks((prev) =>
          prev.map((bm) => (bm.id === id ? response.data : bm))
        );
      } else {
        console.error('Unexpected update response:', response.status, response.data);
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
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
                id={bm.id}
                title={bm.title}
                description={bm.description}
                url={bm.url}
                time={bm.time}
                onDelete={deleteCard}
                onUpdate={updateCard}
              />
            ))}
          </div>
        </div>
        <div className="header">
          <h1>Video Bookmarks</h1>
        </div>
        <div className="video-cards-grid">
          {videoBookmarks.map((vb) => (
              <VideoBookmark
                  key={vb.id}
                  title={vb.title}
                  description={vb.description}
                  url={vb.url}
                  time={vb.time}
                  thumbnail={vb.thumbnail}
              />
          ))}
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
