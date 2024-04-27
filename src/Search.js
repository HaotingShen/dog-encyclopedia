import React, {useState, useEffect} from 'react';
import './Search.css';

function Search({ onSelectBreed, onSearch }) {
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
        onSearch(event.target.value);
    };
  
    const handleSelectBreed = (breedId) => {
        onSelectBreed(breedId);
        setTimeout(() => {
            const section = document.getElementById('dog-breed-section');
            if (section) {
                section.scrollIntoView({behavior: 'smooth'});
            }
        }, 100);
    };
  
    return (
        <section className="search">
            <p id="first-prompt">Enter a keyword to explore dog breeds:</p>
            <p id="second-prompt">e.g. Find breeds with traits like "large" or "hunting".</p>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
            />
            {filteredBreeds.length > 0 && (
            <ul>
                {filteredBreeds.map(breed => (
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
  