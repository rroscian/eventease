import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api')
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the API", error);
      });
  }, []);

  return (
    <div>
      <h1>Frontend with React & Vite</h1>
      <p>Message from API: {message}</p>
    </div>
  );
}

export default App;