import React, { useState } from 'react';
import './App.css';



const App = () => {
  const [data, setData] = useState({
    name: 'aaa',
    id: 1,
    status: true
  })
  console.log(data)
}

export default App;
