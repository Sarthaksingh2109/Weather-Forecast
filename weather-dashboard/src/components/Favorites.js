import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Favorites({ favorites, setFavorites, fetchWeather }) {
  const [newFavorite, setNewFavorite] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editCity, setEditCity] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/favorites')
      .then(response => setFavorites(response.data))
      .catch(error => console.error("Error fetching favorites:", error));
  }, [setFavorites]);

  const addFavorite = () => {
    if (newFavorite) {
      axios.post('http://localhost:5000/favorites', { city: newFavorite })
        .then(response => {
          setFavorites([...favorites, response.data]);
          setNewFavorite('');
        })
        .catch(error => console.error("Error adding favorite city:", error));
    }
  };

  const saveEdit = (id) => {
    if (editCity) {
      axios.put(`http://localhost:5000/favorites/${id}`, { city: editCity })
        .then(response => {
          setFavorites(favorites.map(fav => fav.id === id ? response.data : fav));
          setEditingId(null);
          setEditCity('');
        })
        .catch(error => console.error("Error updating favorite city:", error));
    }
  };

  const removeFavorite = (id) => {
    axios.delete(`http://localhost:5000/favorites/${id}`)
      .then(() => setFavorites(favorites.filter(fav => fav.id !== id)))
      .catch(error => console.error("Error deleting favorite city:", error));
  };

  return (
    <div>
      <h3>Favorites</h3>
      <ul>
        {favorites.map(fav => (
          <li key={fav.id}>
            {editingId === fav.id ? (
              <>
                <input
                  type="text"
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                  placeholder="Edit city name"
                />
                <button onClick={() => saveEdit(fav.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {fav.city}
                <button onClick={() => fetchWeather(fav.city)}>View</button>
                <button onClick={() => {
                  setEditingId(fav.id);
                  setEditCity(fav.city);
                }}>Edit</button>
                <button onClick={() => removeFavorite(fav.id)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Add new favorite"
          value={newFavorite}
          onChange={(e) => setNewFavorite(e.target.value)}
        />
        <button onClick={addFavorite}>Add Favorite</button>
      </div>
    </div>
  );
}

export default Favorites;
