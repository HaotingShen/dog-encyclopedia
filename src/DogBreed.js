import React, { useState, useEffect } from 'react';

function DogBreed({ breedId }) {
  const [breed, setBreed] = useState(null);

  useEffect(() => {
    if (breedId) {
      fetch(`https://dogapi.dog/api/v2/breeds/${breedId}`)
        .then(response => response.json())
        .then(data => {
          setBreed(data.data.attributes);
        });
    }
  }, [breedId]);

  const getImagePath = (breedName) => {
    const imageName = breedName.replace(/ /g, '-');
    return require(`./dog_images/${imageName}.jpg`);
  };

  return (
    <div className="dog-breed">
      {breed ? (
        <>
          <h2>{breed.name}</h2>
          <img src={getImagePath(breed.name)} alt={`${breed.name}`} />
          <p>{breed.description}</p>
          <p>Life expectancy: {breed.life.min} - {breed.life.max} years</p>
          <p>Weight: {breed.male_weight.min}-{breed.male_weight.max} kg (Male), {breed.female_weight.min}-{breed.female_weight.max} kg (Female)</p>
        </>
      ) : (
        <p>Select a breed to see details.</p>
      )}
    </div>
  );
}

export default DogBreed;

