import React, { useState, useEffect } from 'react';
import './Search.css';
import { ALLOWED_BREED_NAMES } from './constants';

// Limit fetches of breeds
async function fetchAllowedBreeds() {
  const wanted = new Set(ALLOWED_BREED_NAMES.map((s) => s.toLowerCase()));
  const found = new Map();
  let page = 1;
  let next = `https://dogapi.dog/api/v2/breeds?page[number]=${page}`;

  while (next && found.size < wanted.size) {
    const res = await fetch(next);
    const json = await res.json();

    for (const b of json.data || []) {
      const nm = b.attributes?.name?.toLowerCase();
      if (wanted.has(nm)) found.set(nm, b);
    }

    next = json?.links?.next || null;
    page += 1;
  }

  const byNameLower = Object.fromEntries([...found.values()].map((b) => [b.attributes.name.toLowerCase(), b]));
  return ALLOWED_BREED_NAMES
    .map((name) => byNameLower[name.toLowerCase()])
    .filter(Boolean);
}

function Search({ onSelectBreed, onSearch }) {
  const [input, setInput] = useState('');
  const [allowedBreeds, setAllowedBreeds] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);

  // Load only allowed breeds
  useEffect(() => {
    let stop = false;
    (async () => {
      const list = await fetchAllowedBreeds();
      if (stop) return;
      setAllowedBreeds(list);
      setFilteredBreeds(list);
    })();
    return () => { stop = true; };
  }, []);

  // Filter only within allowedBreeds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const q = input.toLowerCase();
      const filtered = allowedBreeds.filter((breed) =>
        breed.attributes.name.toLowerCase().includes(q) ||
        breed.attributes.description.toLowerCase().includes(q)
      );
      setFilteredBreeds(filtered);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [input, allowedBreeds]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    onSearch(e.target.value);
  };

  const handleSelectBreed = (breedId) => {
    onSelectBreed(breedId);
    setTimeout(() => {
      const section = document.getElementById('dog-breed-section');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section className="search">
      <p id="first-prompt">Enter a keyword to explore dog breeds:</p>
      <p id="second-prompt">e.g. Find breeds with traits like "large" or "hunting".</p>
      <input type="text" value={input} onChange={handleInputChange} />

      {filteredBreeds.length > 0 && (
        <ul>
          {filteredBreeds.map((breed) => (
            <li key={breed.id} onClick={() => handleSelectBreed(breed.id)}>
              {breed.attributes.name}
            </li>
          ))}
        </ul>
      )}

      {input && filteredBreeds.length === 0 && (
        <div>No breeds found matching "{input}".</div>
      )}
    </section>
  );
}

export default Search;