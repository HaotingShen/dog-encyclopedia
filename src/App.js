import React, { useState } from 'react';
import Search from './Search';
import DogBreed from './DogBreed';
import FunFact from './FunFact';
import './App.css';  // Ensure you have imported the CSS for styling

function App() {
  const [selectedBreedId, setSelectedBreedId] = useState(null);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Dog Encyclopedia</h1>
        <p>Discover breeds, learn about their traits, and explore fun dog facts!</p>
      </header>
      <Search onSelectBreed={setSelectedBreedId} />
      <DogBreed breedId={selectedBreedId} />
      <FunFact />
    </div>
  );
}

export default App;
