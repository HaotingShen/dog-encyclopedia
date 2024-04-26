import React, { useState, useEffect } from 'react';

function Search({ onSelectBreed }) {
  const [input, setInput] = useState('');
  const [breeds, setBreeds] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const searchLower = input.toLowerCase();
      const filtered = breeds.filter(breed =>
        breed.attributes.name.toLowerCase().includes(searchLower) ||
        breed.attributes.description.toLowerCase().includes(searchLower)
      );
      setFilteredBreeds(filtered);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [input, breeds]);

  // Fetch all breeds once when the component mounts
  useEffect(() => {
    fetch('https://dogapi.dog/api/v2/breeds')
      .then(response => response.json())
      .then(data => {
        setBreeds(data.data);
        setFilteredBreeds(data.data);
      });
  }, []);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className="search">
      <p>Search for traits using a keyword:</p>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
      />
      {filteredBreeds.length > 0 && (
        <ul>
          {filteredBreeds.map(breed => (
            <li key={breed.id} onClick={() => onSelectBreed(breed.id)}>
              {breed.attributes.name}
            </li>
          ))}
        </ul>
      )}
      {input && filteredBreeds.length === 0 && (
        <div>No breeds found matching "{input}".</div>
      )}
    </div>
  );
}

export default Search;
