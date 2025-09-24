import React, {useState, useEffect} from 'react';
import './FunFact.css';

function FunFact() {
    const [fact, setFact] = useState('');
    // Fetch a random dog fact
    const fetchFact = async () => {
        const response = await fetch('https://dogapi.dog/api/v2/facts');
        const data = await response.json();
        setFact(data.data[0].attributes.body);
    };

    useEffect(() => {
        fetchFact();
    }, []);

    return (
        <section className="fun-fact">
            <h2>Did you know?</h2>
            <p>{fact}</p>
            <button onClick={fetchFact}>Show another fact</button>
        </section>
    );
}

export default FunFact;