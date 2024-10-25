import React, { useState } from 'react';

function Search({ fetchWeather }) {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    fetchWeather(input);
    setInput('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;
