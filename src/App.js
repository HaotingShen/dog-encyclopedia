import React, {useState} from 'react';
import Search from './Search';
import DogBreed from './DogBreed';
import FunFact from './FunFact';
import './App.css';

function App() {
    const [selectedBreedId, setSelectedBreedId] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');

    return (
        <div className="app">
            <header className="app-header">
                <h1>Dog Encyclopedia</h1>
                <p>Discover breeds, learn about their traits, and explore fun dog facts!</p>
            </header>
            <Search onSelectBreed={setSelectedBreedId} onSearch={setSearchKeyword} />
            <DogBreed breedId={selectedBreedId} searchKeyword={searchKeyword} />
            <FunFact />
        </div>
    );
}

export default App;