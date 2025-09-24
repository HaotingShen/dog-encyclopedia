import React, { useState, useEffect } from 'react';
import './DogBreed.css';

// Preload all JPEGs in src/dog_images
const images = {};
function importAll(r) {
  r.keys().forEach((key) => {
    const fileName = key.replace('./', '').replace('.jpg', '');
    images[fileName] = r(key);
  });
}
importAll(require.context('./dog_images', false, /\.jpg$/));

// Placeholder when no image exists
const PLACEHOLDER_IMAGE =
  'https://via.placeholder.com/400x300?text=Image+Not+Available';

// Highlights search keywords in the description
function highlightKeyword(text, keyword) {
  const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
  return parts.map((part, idx) =>
    part.toLowerCase() === keyword.toLowerCase()
      ? <span key={idx} className="highlight">{part}</span>
      : part
  );
}

function DogBreed({ breedId, searchKeyword }) {
  const [breed, setBreed] = useState(null);

  useEffect(() => {
    if (breedId) {
      fetch(`https://dogapi.dog/api/v2/breeds/${breedId}`)
        .then((response) => response.json())
        .then((data) => {
          setBreed(data.data.attributes);
        })
        .catch(() => setBreed(null));
    }
  }, [breedId]);

  // Look up image by hyphenated name or fall back to placeholder
  const getImageForBreed = (breedName) => {
    const fileKey = breedName.replace(/ /g, '-');
    return images[fileKey] || PLACEHOLDER_IMAGE;
  };

  return (
    <section className="dog-breed" id="dog-breed-section">
      {breed ? (
        <>
          <h2>{breed.name}</h2>
          <img
            src={getImageForBreed(breed.name)}
            alt={`${breed.name}`}
          />
          <p>{highlightKeyword(breed.description, searchKeyword)}</p>
          <p>
            Life expectancy: {breed.life.min}-{breed.life.max} years
          </p>
          <p>
            Weight: {breed.male_weight.min}-{breed.male_weight.max} kg (Male),
            {` `}
            {breed.female_weight.min}-{breed.female_weight.max} kg (Female)
          </p>
        </>
      ) : (
        <p id="notice">Select a breed to see its details or do a keyword search</p>
      )}
    </section>
  );
}

export default DogBreed;