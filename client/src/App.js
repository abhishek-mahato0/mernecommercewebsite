import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
function App() {
  const [products, setProducts] = useState([]);
  async function getData() {
    const { data } = await axios.get('/api/v1/products');
    if (data) {
      setProducts(data);
    }
  }
  useEffect(() => {
    getData();
  }, [products]);
  return (
    <div className="App">
      {products &&
        products.map((ele) => {
          return <div className="name">{ele.name}</div>;
        })}
    </div>
  );
}

export default App;
