import React from 'react'
import {useState, useEffect} from "react";
import './css/App.css'
import {Card} from "./Card.jsx";
import {Form} from "./Form.jsx";
import axios from 'axios';
import VideoBookmark from "./VideoBookmark.jsx";
import {AddVideoBookmark} from "./AddVideoBookmark.jsx";
import { Login } from "./Login.jsx";
import { Bookmark, Video } from "lucide-react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [videoBookmarks, setVideoBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      const decoded = atob(auth);
      const [username, password] = decoded.split(':');
      axios.defaults.auth = { username, password };
      setIsAuthenticated(true);
      setCurrentUser(username);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (! isAuthenticated) return;

    const fetchBookmarks = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('/api/bookmarks');
        const res2 = await axios.get('/api/video-bookmarks');
        setBookmarks(res.data || []);
        setVideoBookmarks(res2.data || []);
      } catch (err) {
        console.error('Failed to fetch bookmarks', err);
        if (err.response?.status === 401) {
          // Authentication failed, logout
          handleLogout();
        } else if (err.response) {
          console.error('Response status:', err.response.status);
          console.error('Response body:', err.response.data);
          setError(`Failed to load bookmarks: ${err.response. status} ${JSON.stringify(err.response.data)}`);
        } else if (err.request) {
          console.error('No response received:', err.request);
          setError('Failed to load bookmarks:  no response from server');
        } else {
          setError(`Failed to load bookmarks: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [isAuthenticated]);

  const handleLoginSuccess = () => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      const decoded = atob(auth);
      const [username] = decoded.split(':');
      setCurrentUser(username);
    }
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    delete axios.defaults.auth;
    setIsAuthenticated(false);
    setCurrentUser('');
    setBookmarks([]);
    setVideoBookmarks([]);
  };

  const handleAddCard = (newCard) => {
    setBookmarks((prev) => [newCard, ...prev]);
  };

  const handleAddVideoCard = (newVideoCard) => {
    setVideoBookmarks((prev) => [newVideoCard, ... prev]);
  };

  const deleteCard = async (id) => {
    try {
      console.log('Deleting bookmark with ID:', id);
      const response = await axios.delete(`/api/bookmarks/${id}`);
      if (response.status === 204 || response.status === 200) {
        setBookmarks((prev) => prev.filter((bm) => bm.id !== id));
      } else {
        console.error('Unexpected delete response:', response.status, response.data);
      }
    } catch (error) {
      console.error("Error deleting bookmark:", error.response?.status, error.response?.data);
      console.error("Full error:", error);
    }
  };

  const deleteVideoCard = async (id) => {
    try {
      const response = await axios.delete(`/api/bookmarks/${id}`);
      if (response.status === 204 || response.status === 200) {
        setVideoBookmarks((prev) => prev.filter((vb) => vb.id !== id));
      } else {
        console.error('Unexpected delete response for video bookmark:', response.status, response.data);
      }
    } catch (error) {
      console.error("Error deleting video bookmark:", error);
    }
  };

  const updateCard = async (id, updatedData) => {
    try {
      const response = await axios.put(`/api/bookmarks/${id}`, updatedData);
      if (response.status === 200) {
        setBookmarks((prev) =>
            prev.map((bm) => (bm.id === id ?  response.data : bm))
        );
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Show loading or error states
  if (loading) return <div className="app-container"><p>Loading bookmarks...</p></div>;
  if (error) return <div className="app-container"><p className="error">{error}</p></div>;

  const visibleBookmarks = isExpanded ? bookmarks : bookmarks.slice(0, 8);
  const visibleVideoBookmarks = isVideoExpanded ? videoBookmarks : videoBookmarks.slice(0, 6);

  return (
      <>
        <div className="glass-header">
           <h1>Bookey - Bookmark Manager</h1>
           <div className="header-user-section">
             {currentUser && (
                 <div className="user-info">
                   <span className="login-label">Logged in as:</span>
                   <div className="user-avatar">
                     {currentUser.charAt(0).toUpperCase()}
                   </div>
                   <span className="username-display">{currentUser}</span>
                 </div>
             )}
             <button className="logout-button" onClick={handleLogout}>Logout</button>
           </div>
        </div>
        <div className="app-container">

          <div className="content">
            <div className="header">
              <h2>Web Bookmarks</h2>
            </div>
            <div className="cards-grid">
              {visibleBookmarks.map((bm) => (
                  <Card
                      key={bm.id}
                      id={bm.id}
                      title={bm. title}
                      description={bm.description}
                      url={bm.url}
                      time={bm.time}
                      onDelete={deleteCard}
                      onUpdate={updateCard}
                  />
              ))}
            </div>
            {bookmarks.length > 8 && (
                <div className="expand-container">
                    <button
                        className="expand-button"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? 'Show Less' : 'Show All'}
                        <span style={{
                            display: 'inline-block',
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s'
                        }}>▼</span>
                    </button>
                </div>
            )}
          </div>

          <div className="content">
            <div className="header">
              <h2>Video Bookmarks</h2>
            </div>
            <div className="video-cards-grid">
              {visibleVideoBookmarks.map((vb) => (
                  <VideoBookmark
                      key={vb.id}
                      id={vb.id}
                      title={vb.title}
                      description={vb.description}
                      videoUrl={vb.videoUrl}
                      time={vb.time}
                      onDelete={deleteVideoCard}
                  />
              ))}
            </div>
             {videoBookmarks.length > 6 && (
                <div className="expand-container">
                    <button
                        className="expand-button"
                        onClick={() => setIsVideoExpanded(!isVideoExpanded)}
                    >
                        {isVideoExpanded ? 'Show Less' : 'Show All'}
                        <span style={{
                            display: 'inline-block',
                            transform: isVideoExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s'
                        }}>▼</span>
                    </button>
                </div>
            )}
          </div>

          <div className="actions-container">
            <button className="glass-button" onClick={()=>setShowForm(true)}>
                <Bookmark size={18} />
                <span>Add Bookmark</span>
            </button>
            <button className="glass-button" onClick={()=>setShowVideoForm(true)}>
                <Video size={18} />
                <span>Add Video Bookmark</span>
            </button>
          </div>

          {showForm && (
              <Form onAddCard={handleAddCard} onClose={() => setShowForm(false)} />
          )}
          {showVideoForm && (
            <AddVideoBookmark onAddCard={handleAddVideoCard} onClose={() => setShowVideoForm(false)} />
          )}
        </div>
      </>
  )
}

export default App