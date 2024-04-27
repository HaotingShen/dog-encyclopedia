import React, {useState, useEffect} from 'react';
import './DogBreed.css';

function highlightKeyword(text, keyword) {
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return parts.map(part => part.toLowerCase() === keyword.toLowerCase()
        ? <span className="highlight">{part}</span>
        : part);
}
  
function DogBreed({breedId, searchKeyword}) {
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
        <section className="dog-breed" id="dog-breed-section">
            {breed ? (
                <>
                <h2>{breed.name}</h2>
                <img src={getImagePath(breed.name)} alt={`${breed.name}`} />
                <p>{highlightKeyword(breed.description, searchKeyword)}</p>
                <p>Life expectancy: {breed.life.min} - {breed.life.max} years</p>
                <p>Weight: {breed.male_weight.min}-{breed.male_weight.max} kg (Male), {breed.female_weight.min}-{breed.female_weight.max} kg (Female)</p>
                </>
            ) : (
                <p id="notice">Select a breed to see its details or do a keyword search</p>
            )}
        </section>
    );
}

export default DogBreed;